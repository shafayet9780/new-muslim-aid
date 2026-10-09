import { NextRequest, NextResponse } from 'next/server';
import { isValidObjectId, type Model } from 'mongoose';
import connectDB from '@/lib/mongodb';
import NikahApplication from '@/models/NikahApplication';
import NafApplication from '@/models/NafApplication';
import { getFormConfig } from '@/lib/form-configs';
import { requireAdmin } from '@/lib/admin';
import { buildSubmissionDocx, docxFilename } from '@/lib/form-docx';

const MODELS: Record<string, Model<any>> = {
  'nikah-aid': NikahApplication,
  naf: NafApplication,
  'birth-CertificateReform': NafApplication,
  birthCertificateReform: NafApplication,
};

/** admin — একটি আবেদনের Word (.docx) ফাইল ডাউনলোড */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ form: string; id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'অনুমতি নেই' }, { status: 403 });
  }

  const { form, id } = await params;
  const Model = MODELS[form];
  const config = getFormConfig(form);
  if (!Model || !config || !isValidObjectId(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    await connectDB();
    const doc = await Model.findById(id).lean<{ _id: unknown; answers: Record<string, unknown>; createdAt: Date }>();
    if (!doc) {
      return NextResponse.json({ error: 'পাওয়া যায়নি' }, { status: 404 });
    }

    const buffer = await buildSubmissionDocx(config, {
      answers: doc.answers || {},
      createdAt: doc.createdAt,
      _id: String(doc._id),
    });
    const name = docxFilename(form === 'nikah-aid' ? 'nikah-aid' : 'birthCerReform', String(doc._id));

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': name.header,
        'Content-Length': String(buffer.length),
        // ব্যক্তিগত তথ্য — browser/proxy তে cache হবে না
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    console.error('❌ Admin docx error:', err);
    return NextResponse.json({ error: 'সার্ভারে ত্রুটি হয়েছে' }, { status: 500 });
  }
}
