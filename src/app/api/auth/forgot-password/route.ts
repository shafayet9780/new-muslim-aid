import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'সঠিক ইমেইল ঠিকানা দিন' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    await connectDB();

    const user = await User.findOne({ email: normalizedEmail });

    // Always return success (security: don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          'যদি এই ইমেইলে অ্যাকাউন্ট থাকে, রিসেট লিঙ্ক পাঠানো হয়েছে।',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const resetUrl = `${siteUrl}/bn/auth/reset-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      resetUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'যদি এই ইমেইলে অ্যাকাউন্ট থাকে, রিসেট লিঙ্ক পাঠানো হয়েছে।',
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    return NextResponse.json(
      { error: 'সার্ভারে ত্রুটি হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
