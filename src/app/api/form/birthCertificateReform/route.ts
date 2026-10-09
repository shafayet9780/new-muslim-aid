import { NextRequest, NextResponse, after } from 'next/server';
import connectDB from '@/lib/mongodb';
import NafApplication from '@/models/NafApplication';
import { nafConfig } from '@/lib/form-configs';
import { validateSubmission } from '@/lib/form-submit';
import { verifyUploadedUrls } from '@/lib/form-upload';
import { buildSubmissionDocx, docxFilename } from '@/lib/form-docx';
import { sendBirthCerReformRequestEmail } from '@/lib/email';
import { rateLimit, clientIp } from '@/lib/rate-limit';

// file এখন সরাসরি Blob এ যায়; এই request এ শুধু টেক্সট ও URL থাকে
const MAX_BODY_BYTES = 1 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // spam / email flood ঠেকাতে — প্রতি IP থেকে ১ ঘণ্টায় সর্বোচ্চ ৫টি আবেদন
    if (!rateLimit(`birthCerReform:${clientIp(request.headers)}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।' },
        { status: 429 }
      );
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'অনুরোধটি অনেক বড়।' }, { status: 413 });
    }

    // client আগেই file গুলো Blob এ আপলোড করে URL পাঠায় (multipart form-data)
    const formData = await request.formData();

    // scalar + checkbox মান গুলো raw object এ জড়ো করি
    const raw: Record<string, unknown> = {};
    for (const field of nafConfig.fields) {
      if (field.type === 'section' || field.type === 'file') continue;
      if (field.type === 'checkbox') {
        raw[field.name] = formData.getAll(field.name).map((v) => String(v));
      } else {
        const v = formData.get(field.name);
        raw[field.name] = v == null ? '' : String(v);
      }
    }

    const { ok, error, answers } = validateSubmission(nafConfig, raw);
    if (!ok) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // client-upload করা file URL গুলো যাচাই
    const upload = await verifyUploadedUrls(nafConfig, formData);
    if (!upload.ok) {
      return NextResponse.json({ error: upload.error }, { status: 400 });
    }

    // uploaded file URL গুলো answers এ merge
    Object.assign(answers, upload.files);

    await connectDB();

    const created = await NafApplication.create({
      newNameBn: answers.newNameBn as string,
      phone: (answers.phone as string) || '',
      birthDate: (answers.birthDate as string) || '',
      answers,
    });

    // Word ফাইল তৈরি + মেইল — response পাঠানোর পরে background এ চলে,
    // তাই ব্যবহারকারীকে SMTP এর জন্য অপেক্ষা করতে হয় না।
    after(async () => {
      try {
        const id = String(created._id);
        const buffer = await buildSubmissionDocx(nafConfig, {
          answers,
          createdAt: created.createdAt,
          _id: id,
        });
        const sent = await sendBirthCerReformRequestEmail({
          applicantName: (answers.newNameBn as string) || (answers.newNameEn as string) || 'নাম নেই',
          applicantPhone: (answers.phone as string) || undefined,
          applicantEmail: (answers.email as string) || undefined,
          docxBuffer: buffer,
          docxFilename: docxFilename('birthCerReform', id).ascii,
        });
        if (sent) {
          await NafApplication.updateOne({ _id: created._id }, { emailSent: true });
        }
      } catch (err) {
        console.error('❌ birthCerReform email/docx error:', err);
      }
    });

    return NextResponse.json({
      success: true,
      message: 'আপনার আবেদন সফলভাবে জমা হয়েছে। জাযাকাল্লাহু খাইরান।',
    });
  } catch (err) {
    console.error('❌ NAF submission error:', err);
    return NextResponse.json(
      { error: 'সার্ভারে ত্রুটি হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
