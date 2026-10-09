/**
 * Email Utility for sending donation invoices
 * Uses Nodemailer with Gmail SMTP (free)
 */

import nodemailer from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

interface InvoiceParams {
  donorName: string;
  donorEmail: string;
  amount: string;
  transactionId: string;
  transactionDate: string;
  paymentMethod: string;
}

/**
 * Send a donation invoice email to the donor
 */
export async function sendDonationInvoice(params: InvoiceParams): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const fromName = process.env.SMTP_FROM_NAME || 'NewMuslim Aid Foundation';
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    const htmlContent = generateInvoiceHTML(params);

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: params.donorEmail,
      subject: `দানের রসিদ - NewMuslim Aid Foundation | Transaction: ${params.transactionId}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to send invoice email:', error);
    return false;
  }
}

function generateInvoiceHTML(params: InvoiceParams): string {
  const formattedAmount = new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(parseFloat(params.amount));

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://newmuslimaid.com').replace(/\/$/, '');
  const logoUrl = `${siteUrl}/logo.png`;

  return `
<!DOCTYPE html>
<html lang="bn" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1B4332 0%,#2D5A40 50%,#006A4E 100%);padding:40px 40px 30px;text-align:center;">
              <img src="${logoUrl}" alt="NewMuslim Aid Foundation" width="80" height="80" style="display:block;margin:0 auto 16px;border-radius:12px;width:80px;height:80px;object-fit:contain;" />
              <h1 style="color:#FFD700;font-size:28px;margin:0 0 8px;font-weight:800;">
                NewMuslim Aid Foundation
              </h1>
              <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;">
                বাংলাদেশে নওমুসলিমদের পরিচর্যা কেন্দ্র
              </p>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td style="padding:30px 40px 0;text-align:center;">
              <div style="display:inline-block;background-color:#ecfdf5;border:2px solid #10b981;border-radius:50px;padding:12px 30px;">
                <span style="color:#059669;font-size:18px;font-weight:700;">✓ দান সফল হয়েছে!</span>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="color:#374151;font-size:16px;line-height:1.6;margin:0;">
                প্রিয় <strong>${escapeHtml(params.donorName)}</strong>,
              </p>
              <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:8px 0 0;">
                আপনার দানের জন্য আল্লাহ আপনাকে উত্তম প্রতিদান দিন। আপনার লেনদেনের বিবরণ নিচে দেওয়া হলো:
              </p>
            </td>
          </tr>

          <!-- Invoice Details -->
          <tr>
            <td style="padding:24px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color:#6b7280;font-size:14px;">ট্রানজেকশন আইডি</td>
                        <td style="color:#111827;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(params.transactionId)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color:#6b7280;font-size:14px;">তারিখ</td>
                        <td style="color:#111827;font-size:14px;font-weight:600;text-align:right;">${params.transactionDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color:#6b7280;font-size:14px;">পেমেন্ট মাধ্যম</td>
                        <td style="color:#111827;font-size:14px;font-weight:600;text-align:right;">${params.paymentMethod}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border-radius:0 0 12px 12px;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color:#059669;font-size:16px;font-weight:700;">দানের পরিমাণ</td>
                        <td style="color:#059669;font-size:22px;font-weight:800;text-align:right;">${formattedAmount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dua Section -->
          <tr>
            <td style="padding:0 40px 24px;">
              <div style="background:linear-gradient(135deg,#fefce8,#fffbeb);border:1px solid #fde68a;border-radius:12px;padding:20px 24px;text-align:center;">
                <p style="color:#92400e;font-size:18px;font-weight:600;margin:0 0 8px;font-style:italic;">
                  "যারা নিজেদের ধন সম্পদ আল্লাহ্‌র পথে ব্যয় করে তাদের উপমা একটি বীজের মত, যা সাতটি শীষ উৎপাদন করে, প্রত্যেক শীষে একশ শস্যদানা। আর আল্লাহ্‌ যাকে ইচ্ছে বহুগুণে বৃদ্ধি করে দেন। আর আল্লাহ্‌ সর্বব্যাপী- প্রাচুর্যময়, সর্বজ্ঞ ।"
                </p>
                <p style="color:#a16207;font-size:13px;margin:0;">— সূরা আল-বাকারা, ২:২৬১</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0;text-align:center;">
                এই ইমেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।<br>
                কোনো প্রশ্ন থাকলে যোগাযোগ করুন: <a href="tel:01861886162" style="color:#059669;text-decoration:none;">01861886162</a>
              </p>
              <p style="color:#d1d5db;font-size:12px;margin:16px 0 0;text-align:center;">
                © ${new Date().getFullYear()} NewMuslim Aid Foundation. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

interface PasswordResetParams {
  name: string;
  email: string;
  resetUrl: string;
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(params: PasswordResetParams): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const fromName = process.env.SMTP_FROM_NAME || 'NewMuslim Aid Foundation';
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://newmuslimaid.com').replace(/\/$/, '');
    const logoUrl = `${siteUrl}/logo.png`;

    const html = `
<!DOCTYPE html>
<html lang="bn">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1B4332 0%,#2D5A40 50%,#006A4E 100%);padding:40px;text-align:center;">
            <img src="${logoUrl}" alt="NewMuslim Aid Foundation" width="70" height="70" style="display:block;margin:0 auto 16px;border-radius:10px;" />
            <h1 style="color:#FFD700;font-size:24px;margin:0 0 8px;font-weight:800;">NewMuslim Aid Foundation</h1>
            <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;">পাসওয়ার্ড রিসেট</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#374151;font-size:16px;line-height:1.6;">প্রিয় <strong>${escapeHtml(params.name)}</strong>,</p>
            <p style="color:#6b7280;font-size:15px;line-height:1.6;">আপনি পাসওয়ার্ড রিসেটের জন্য অনুরোধ করেছেন। নিচের বাটনে ক্লিক করে নতুন পাসওয়ার্ড সেট করুন:</p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${params.resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#1B4332,#006A4E);color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:700;">পাসওয়ার্ড রিসেট করুন</a>
            </div>
            <p style="color:#9ca3af;font-size:13px;line-height:1.6;">এই লিঙ্কটি ১ ঘণ্টার জন্য কার্যকর। আপনি যদি পাসওয়ার্ড রিসেটের অনুরোধ না করে থাকেন, এই ইমেইলটি উপেক্ষা করুন।</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
            <p style="color:#d1d5db;font-size:12px;text-align:center;">© ${new Date().getFullYear()} NewMuslim Aid Foundation. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: params.email,
      subject: 'পাসওয়ার্ড রিসেট — NewMuslim Aid Foundation',
      html,
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error);
    return false;
  }
}

interface NudgeEmailParams {
  recipientName: string;
  recipientEmail: string;
  donorName: string;
  donorAmount: number;
  unsubscribeToken: string;
}

/**
 * Send a monthly nudge email to referral link creator
 */
export async function sendNudgeEmail(params: NudgeEmailParams): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const fromName = process.env.SMTP_FROM_NAME || 'NewMuslim Aid Foundation';
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://newmuslimaid.com').replace(/\/$/, '');
    const logoUrl = `${siteUrl}/logo.png`;
    const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${params.unsubscribeToken}`;
    const donationUrl = `${siteUrl}/bn/donation`;

    const formattedAmount = new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(params.donorAmount);

    const html = `
<!DOCTYPE html>
<html lang="bn">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1B4332 0%,#2D5A40 50%,#006A4E 100%);padding:40px;text-align:center;">
            <img src="${logoUrl}" alt="NewMuslim Aid Foundation" width="70" height="70" style="display:block;margin:0 auto 16px;border-radius:10px;" />
            <h1 style="color:#FFD700;font-size:24px;margin:0 0 8px;font-weight:800;">NewMuslim Aid Foundation</h1>
            <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;">সাদকায়ে জারিয়ার নতুন খবর 🌱</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#374151;font-size:16px;line-height:1.6;">প্রিয় <strong>${escapeHtml(params.recipientName)}</strong>,</p>
            <p style="color:#6b7280;font-size:15px;line-height:1.6;">আপনার শেয়ার করা সাদকায়ে জারিয়া লিঙ্কের মাধ্যমে <strong>${escapeHtml(params.donorName)}</strong> এই মাসে <strong style="color:#059669;">${formattedAmount}</strong> দান করেছেন।</p>
            <div style="background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border:1px solid #a7f3d0;border-radius:12px;padding:20px;text-align:center;margin:24px 0;">
              <p style="color:#065f46;font-size:15px;font-weight:600;margin:0 0 4px;">আপনিও কি এই মাসে অংশগ্রহণ করবেন?</p>
              <p style="color:#6b7280;font-size:13px;margin:0;">প্রতিটি দান নওমুসলিমদের জীবন পরিবর্তন করতে সাহায্য করে।</p>
            </div>
            <div style="text-align:center;margin:24px 0;">
              <a href="${donationUrl}" style="display:inline-block;background:linear-gradient(135deg,#1B4332,#006A4E);color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:700;">এখনই দান করুন</a>
            </div>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
            <p style="color:#9ca3af;font-size:12px;text-align:center;line-height:1.8;">
              আপনি এই ইমেইল পাচ্ছেন কারণ আপনি NewMuslim Aid Foundation-এ সাদকায়ে জারিয়া লিঙ্ক তৈরি করেছেন।<br>
              ইমেইল বন্ধ করতে চাইলে: <a href="${unsubscribeUrl}" style="color:#059669;text-decoration:underline;">এখানে ক্লিক করুন (আনসাবস্ক্রাইব)</a>
            </p>
            <p style="color:#d1d5db;font-size:12px;text-align:center;margin-top:8px;">© ${new Date().getFullYear()} NewMuslim Aid Foundation. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: params.recipientEmail,
      subject: `${params.donorName} দান করেছেন — আপনিও অংশগ্রহণ করুন | NewMuslim Aid Foundation`,
      html,
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to send nudge email:', error);
    return false;
  }
}

/* ============================================================
 *  নওমুসলিমদের জন্ম নিবন্ধনে নাম পরিবর্তন সহায়তা অনুরোধ — admin/সংশ্লিষ্ট ঠিকানায় Word ফাইল সহ মেইল
 * ============================================================ */

/** HTML email এ user input বসানোর আগে escape — HTML injection ঠেকাতে */
export function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** header (subject ইত্যাদি) এর জন্য — CR/LF ও control char বাদ, দৈর্ঘ্য সীমিত */
function headerSafe(s: string, max = 120): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

/** env থেকে comma/semicolon/space আলাদা করা বৈধ email list */
export function getBirthCerReformRecipients(): string[] {
  const raw = process.env.BIRTH_CERTIFICATE_REFORM_NOTIFY_EMAILS || '';
  return raw
    .split(/[,;\s]+/)
    .map((e) => e.trim())
    .filter((e) => EMAIL_RE.test(e));
}

interface BirthCerReformEmailParams {
  applicantName: string;
  applicantPhone?: string;
  applicantEmail?: string;
  docxBuffer: Buffer;
  docxFilename: string;
}

export async function sendBirthCerReformRequestEmail(params: BirthCerReformEmailParams): Promise<boolean> {
  const recipients = getBirthCerReformRecipients();
  if (recipients.length === 0) {
    console.warn('⚠️ NOTIFY_EMAILS সেট করা নেই — info মেইল এ পাঠানো হয়নি');
    return false;
  }

  try {
    const transporter = getTransporter();
    const fromName = process.env.SMTP_FROM_NAME || 'NewMuslim Aid Foundation';
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    const name = headerSafe(params.applicantName, 80);
    const nameHtml = escapeHtml(name);
    const phoneHtml = params.applicantPhone ? escapeHtml(params.applicantPhone) : '';
    const emailHtml = params.applicantEmail ? escapeHtml(params.applicantEmail) : '';

    const subject = `জন্ম নিবন্ধনে নাম পরিবর্তন এর অনুরোধ (${name})`;

    const text = [
      'আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ,',
      '',
      'আমি একজন নওমুসলিম। ধর্ম ও নাম পরিবর্তনের জন্ম নিবন্ধনে নাম পরিবর্তন সংক্রান্ত সহায়তার জন্য আমার প্রয়োজনীয় সকল তথ্য সংযুক্ত ওয়ার্ড ফাইলে প্রদান করা হলো।',
      'বিষয়টি সদয় বিবেচনাপূর্বক গুরুত্বের সাথে দেখার জন্য বিনীত অনুরোধ করছি।',
      'আপনাদের পরবর্তী রেসপন্সের অপেক্ষায় রইলাম। জাযাকুমুল্লাহু খাইরান।',
      '',
      'বিনীত,',
      name,
      params.applicantPhone ? `মোবাইল: ${params.applicantPhone}` : '',
      params.applicantEmail ? `ইমেইল: ${params.applicantEmail}` : '',
    ]
      .filter((l, i, arr) => l !== '' || arr[i - 1] !== '')
      .join('\n');

    const html = `
<!DOCTYPE html>
<html lang="bn">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f3f4f6;font-family:'Segoe UI',Tahoma,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;color:#374151;font-size:15px;line-height:1.8;">
    <p style="margin:0 0 16px;">আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ,</p>
    <p style="margin:0 0 12px;">আমি একজন নওমুসলিম। ধর্ম ও নাম পরিবর্তনের জন্ম নিবন্ধনে নাম পরিবর্তন সংক্রান্ত সহায়তার জন্য আমার প্রয়োজনীয় সকল তথ্য সংযুক্ত ওয়ার্ড ফাইলে প্রদান করা হলো।</p>
    <p style="margin:0 0 12px;">বিষয়টি সদয় বিবেচনাপূর্বক গুরুত্বের সাথে দেখার জন্য বিনীত অনুরোধ করছি।</p>
    <p style="margin:0 0 24px;">আপনাদের পরবর্তী রেসপন্সের অপেক্ষায় রইলাম। জাযাকুমুল্লাহু খাইরান।</p>
    <p style="margin:0;">বিনীত,<br><strong>${nameHtml}</strong>
      ${phoneHtml ? `<br>মোবাইল: ${phoneHtml}` : ''}
      ${emailHtml ? `<br>ইমেইল: ${emailHtml}` : ''}
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 12px;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">এই মেইলটি NewMuslim Aid Foundation ওয়েবসাইটের ফর্ম থেকে স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।</p>
  </div>
</body>
</html>`.trim();

    // replyTo শুধুমাত্র বৈধ email হলে — প্রাপক সরাসরি আবেদনকারীকে উত্তর দিতে পারবেন
    const replyTo =
      params.applicantEmail && EMAIL_RE.test(params.applicantEmail)
        ? params.applicantEmail
        : undefined;

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: recipients,
      replyTo,
      subject,
      text,
      html,
      attachments: [
        {
          filename: params.docxFilename,
          content: params.docxBuffer,
          contentType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      ],
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to send affidavit email:', error);
    return false;
  }
}
