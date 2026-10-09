import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NikahApplication from '@/models/NikahApplication';
import NafApplication from '@/models/NafApplication';
import { getFormConfig } from '@/lib/form-configs';
import { requireAdmin } from '@/lib/admin';
import type { Model } from 'mongoose';

const MODELS: Record<string, Model<any>> = {
  'nikah-aid': NikahApplication,
  naf: NafApplication,
  'birth-CertificateReform': NafApplication,
  birthCertificateReform: NafApplication,
};

// list column + createdAt/status — এই field গুলোতেই sort allowed
const SORTABLE_TOPLEVEL: Record<string, string[]> = {
  'nikah-aid': ['candidateName', 'lookingFor', 'guardianPhone', 'createdAt', 'status'],
  naf: ['newNameBn', 'phone', 'birthDate', 'createdAt', 'status'],
  'birth-CertificateReform': ['newNameBn', 'phone', 'birthDate', 'createdAt', 'status'],
  birthCertificateReform: ['newNameBn', 'phone', 'birthDate', 'createdAt', 'status'],
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ form: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'অনুমতি নেই' }, { status: 403 });
  }

  const { form } = await params;
  const Model = MODELS[form];
  const config = getFormConfig(form);
  if (!Model || !config) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const requestedSort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 1 : -1;
  const sortBy = SORTABLE_TOPLEVEL[form].includes(requestedSort)
    ? requestedSort
    : 'createdAt';

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    await connectDB();

    const [rows, total] = await Promise.all([
      Model.find({})
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .lean(),
      Model.countDocuments({}),
    ]);

    return NextResponse.json({
      rows,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      sort: sortBy,
      order: order === 1 ? 'asc' : 'desc',
      columns: config.listColumns,
    });
  } catch (err) {
    console.error('❌ Admin list error:', err);
    return NextResponse.json({ error: 'সার্ভারে ত্রুটি হয়েছে' }, { status: 500 });
  }
}
