import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import PendingDonation from '@/models/PendingDonation';

// Input validation helpers
function validatePhone(phone: string): boolean {
    return /^01[3-9]\d{8}$/.test(phone.replace(/\s|-/g, ''));
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeName(name: string): string {
    return name.replace(/[<>&"'/]/g, '').trim().slice(0, 100);
}

// Rate limiting: simple in-memory store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
        return true;
    }

    return false;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'অনেক বেশি রিকোয়েস্ট। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।' },
                { status: 429 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { name, phone, email, amount, pageType, referralCode } = body;

        // ========= INPUT VALIDATION =========

        // Name validation
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return NextResponse.json(
                { error: 'সঠিক নাম দিন (কমপক্ষে ২ অক্ষর)' },
                { status: 400 }
            );
        }

        // Phone validation (Bangladesh format)
        if (!phone || !validatePhone(phone)) {
            return NextResponse.json(
                { error: 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)' },
                { status: 400 }
            );
        }

        // Email validation
        if (!email || !validateEmail(email)) {
            return NextResponse.json(
                { error: 'সঠিক ইমেইল ঠিকানা দিন' },
                { status: 400 }
            );
        }

        // Amount validation (1 - 500000 BDT)
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 500000) {
            return NextResponse.json(
                { error: 'দানের পরিমাণ ১ থেকে ৫,০০,০০০ টাকার মধ্যে হতে হবে' },
                { status: 400 }
            );
        }

        // Page type validation
        const validPageType = pageType === 'zakat' ? 'zakat' : 'donation';

        // ========= PAYSTATION API CALL =========

        const merchantId = process.env.PAYSTATION_MERCHANT_ID;
        const password = process.env.PAYSTATION_PASSWORD;
        const isSandbox = process.env.PAYSTATION_IS_SANDBOX === 'true';

        if (!merchantId || !password) {
            console.error('❌ Paystation credentials not configured');
            return NextResponse.json(
                { error: 'পেমেন্ট সিস্টেম কনফিগারেশন ত্রুটি। অনুগ্রহ করে যোগাযোগ করুন।' },
                { status: 500 }
            );
        }

        const baseUrl = isSandbox
            ? 'https://sandbox.paystation.com.bd'
            : 'https://api.paystation.com.bd';

        // Generate secure unique invoice number
        const invoiceNumber = `NMA-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

        // Build callback URL
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const callbackUrl = `${siteUrl}/bn/donation/callback`;

        // Sanitize inputs
        const sanitizedName = sanitizeName(name);
        const cleanPhone = phone.replace(/\s|-/g, '');

        // Prepare form data for Paystation
        const formData = new FormData();
        formData.append('merchantId', merchantId);
        formData.append('password', password);
        formData.append('invoice_number', invoiceNumber);
        formData.append('currency', 'BDT');
        formData.append('payment_amount', Math.floor(parsedAmount).toString());
        formData.append('reference', `NewMuslim Aid - ${validPageType}`);
        formData.append('cust_name', sanitizedName);
        formData.append('cust_phone', cleanPhone);
        formData.append('cust_email', email.trim().toLowerCase());
        formData.append('cust_address', 'Bangladesh');
        formData.append('callback_url', callbackUrl);
        formData.append('checkout_items', JSON.stringify({
            type: validPageType,
            organization: 'NewMuslim Aid Foundation'
        }));
        formData.append('opt_a', validPageType); // donation or zakat
        formData.append('opt_b', sanitizedName); // donor name for verification
        formData.append('opt_c', email.trim().toLowerCase()); // donor email for invoice
        if (referralCode && typeof referralCode === 'string') {
            formData.append('opt_d', referralCode.trim()); // সাদকায়ে জারিয়া referral code
        }

        // Call Paystation API
        const response = await fetch(`${baseUrl}/initiate-payment`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.status_code === '200' && result.status === 'success' && result.payment_url) {
            // সবসময় PendingDonation এ সেভ করো — donor info + referralCode
            // (Paystation transaction-status এ opt_b/opt_c/opt_a আসে না)
            try {
                await connectDB();
                await PendingDonation.create({
                    invoiceNumber: result.invoice_number || invoiceNumber,
                    donorName: sanitizedName,
                    donorEmail: email.trim().toLowerCase(),
                    pageType: validPageType,
                    referralCode: (referralCode && typeof referralCode === 'string')
                        ? referralCode.trim()
                        : undefined,
                });
            } catch (pendingError) {
                console.error('⚠️ Failed to save pending donation:', pendingError);
                // Don't fail the payment because of this
            }

            return NextResponse.json({
                success: true,
                payment_url: result.payment_url,
                invoice_number: result.invoice_number || invoiceNumber,
            });
        } else {
            console.error('❌ Paystation initiate failed:', result);
            return NextResponse.json(
                { error: result.message || 'পেমেন্ট শুরু করতে ব্যর্থ। আবার চেষ্টা করুন।' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('❌ Payment initiation error:', error);
        return NextResponse.json(
            { error: 'সার্ভারে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' },
            { status: 500 }
        );
    }
}
