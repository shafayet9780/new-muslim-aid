import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { ALLOWED_UPLOAD_TYPES, MAX_FILE_SIZE } from '@/lib/form-upload';
import { rateLimit, clientIp } from '@/lib/rate-limit';

/**
 * Client-direct upload এর token endpoint।
 * ব্রাউজার ফাইল সরাসরি Vercel Blob এ পাঠায় (Vercel function এর ৪.৫ MB body limit পার হয়ে),
 * আর এখানে শুধু "কী আপলোড করা যাবে" তার সীমা ঠিক করা হয়:
 * path prefix, MIME type ও সর্বোচ্চ সাইজ — token এ বাঁধা থাকে, client বদলাতে পারে না।
 */
export async function POST(request: NextRequest) {
  if (!rateLimit(`birthCerReform-upload:${clientIp(request.headers)}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'অনেকবার চেষ্টা করা হয়েছে।' }, { status: 429 });
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const ext = (pathname.split('.').pop() || '').toLowerCase();
        const okExt = Object.values(ALLOWED_UPLOAD_TYPES).some((e) => e.includes(ext));
        if (!pathname.startsWith('forms/naf/') || pathname.includes('..') || !okExt) {
          throw new Error('অনুমোদিত নয়');
        }
        return {
          allowedContentTypes: Object.keys(ALLOWED_UPLOAD_TYPES),
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('❌ Blob token error:', err);
    return NextResponse.json({ error: 'আপলোড অনুমোদন করা যায়নি' }, { status: 400 });
  }
}
