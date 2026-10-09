import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NikahApplication from '@/models/NikahApplication';
import { nikahAidConfig } from '@/lib/form-configs';
import { validateSubmission } from '@/lib/form-submit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { ok, error, answers } = validateSubmission(nikahAidConfig, body);
    if (!ok) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await connectDB();

    await NikahApplication.create({
      candidateName: answers.candidateName as string,
      lookingFor: (answers.lookingFor as string) || '',
      guardianPhone: (answers.guardianPhone as string) || '',
      answers,
    });

    return NextResponse.json({
      success: true,
      message: 'আপনার তথ্য সফলভাবে জমা হয়েছে। জাযাকাল্লাহু খাইরান।',
    });
  } catch (err) {
    console.error('❌ Nikah Aid submission error:', err);
    return NextResponse.json(
      { error: 'সার্ভারে ত্রুটি হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
