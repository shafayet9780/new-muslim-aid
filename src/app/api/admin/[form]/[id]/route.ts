import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NikahApplication from '@/models/NikahApplication';
import NafApplication from '@/models/NafApplication';
import { getFormConfig } from '@/lib/form-configs';
import { requireAdmin } from '@/lib/admin';
import { isValidObjectId, type Model } from 'mongoose';

const MODELS: Record<string, Model<any>> = {
  'nikah-aid': NikahApplication,
  naf: NafApplication,
  'birth-CertificateReform': NafApplication,
  birthCertificateReform: NafApplication,
};

const VALID_STATUS = ['new', 'reviewed', 'contacted', 'archived'];

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
    const doc = await Model.findById(id).lean();
    if (!doc) {
      return NextResponse.json({ error: 'পাওয়া যায়নি' }, { status: 404 });
    }
    // config এর fields সহ পাঠাই যাতে modal এ label অনুযায়ী দেখানো যায়
    return NextResponse.json({ doc, fields: config.fields });
  } catch (err) {
    console.error('❌ Admin detail error:', err);
    return NextResponse.json({ error: 'সার্ভারে ত্রুটি হয়েছে' }, { status: 500 });
  }
}

// status আপডেট (new → reviewed ইত্যাদি)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ form: string; id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'অনুমতি নেই' }, { status: 403 });
  }

  const { form, id } = await params;
  const Model = MODELS[form];
  if (!Model || !isValidObjectId(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const status = body.status;
    if (!VALID_STATUS.includes(status)) {
      return NextResponse.json({ error: 'অবৈধ status' }, { status: 400 });
    }

    await connectDB();
    const doc = await Model.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!doc) {
      return NextResponse.json({ error: 'পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ success: true, status });
  } catch (err) {
    console.error('❌ Admin status update error:', err);
    return NextResponse.json({ error: 'সার্ভারে ত্রুটি হয়েছে' }, { status: 500 });
  }
}
