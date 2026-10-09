import { FormConfig } from './form-configs';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * অনুমোদিত MIME type → অনুমোদিত extension।
 * client এর পাঠানো MIME বিশ্বাসযোগ্য না, তাই extension ও ফাইলের
 * আসল content (magic bytes) — সব মিলিয়ে দেখা হয়।
 */
export const ALLOWED_UPLOAD_TYPES: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'image/heic': ['heic', 'heif'],
  'application/pdf': ['pdf'],
};

/** file এর শুরুর bytes দেখে আসল ধরন যাচাই */
function matchesMagic(mime: string, b: Uint8Array): boolean {
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...b.subarray(start, end));
  switch (mime) {
    case 'image/jpeg':
      return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
    case 'image/png':
      return b[0] === 0x89 && ascii(1, 4) === 'PNG';
    case 'image/webp':
      return ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP';
    case 'image/heic':
      return ascii(4, 8) === 'ftyp';
    case 'application/pdf':
      return ascii(0, 5) === '%PDF-';
    default:
      return false;
  }
}

/** URL টা আমাদের Vercel Blob store এর কি না */
function isBlobHost(hostname: string): boolean {
  // *.blob.vercel-storage.com (public ও private দুটোই)
  if (hostname.endsWith('.blob.vercel-storage.com')) return true;
  // env এ কাস্টম base URL থাকলে সেটাও গ্রহণযোগ্য
  const base = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  if (base) {
    try {
      if (new URL(base).hostname === hostname) return true;
    } catch { /* empty */ }
  }
  return false;
}

export interface FileUploadResult {
  ok: boolean;
  error?: string;
  /** field name → uploaded blob URL */
  files: Record<string, string>;
}

/**
 * Client-direct upload এর পরে — form এ আসা blob URL গুলো যাচাই করে।
 * (১) URL আমাদের Vercel Blob store এর কি না,
 * (২) path prefix ঠিক আছে কি না,
 * (৩) ফাইলের শুরুর bytes আসলেই ছবি/PDF কি না।
 */
export async function verifyUploadedUrls(
  config: FormConfig,
  formData: FormData
): Promise<FileUploadResult> {
  const files: Record<string, string> = {};

  for (const field of config.fields.filter((f) => f.type === 'file')) {
    const v = formData.get(field.name);
    const urlStr = typeof v === 'string' ? v.trim() : '';

    if (!urlStr) {
      if (field.required) {
        return { ok: false, error: `"${field.label}" আপলোড করুন`, files: {} };
      }
      continue;
    }

    let url: URL;
    try {
      url = new URL(urlStr);
    } catch {
      return { ok: false, error: `"${field.label}" — ফাইলটি সঠিক নয়`, files: {} };
    }

    if (url.protocol !== 'https:') {
      return { ok: false, error: `"${field.label}" — ফাইলটি সঠিক নয়`, files: {} };
    }

    if (!isBlobHost(url.hostname)) {
      return { ok: false, error: `"${field.label}" — ফাইলটি সঠিক নয়`, files: {} };
    }

    if (!url.pathname.includes(`/forms/${config.slug}/`) || urlStr.length > 500) {
      return { ok: false, error: `"${field.label}" — ফাইলটি সঠিক নয়`, files: {} };
    }

    const ext = (url.pathname.split('.').pop() || '').toLowerCase();
    const mime = Object.keys(ALLOWED_UPLOAD_TYPES).find((m) =>
      ALLOWED_UPLOAD_TYPES[m].includes(ext)
    );
    if (!mime) {
      return { ok: false, error: `"${field.label}" — শুধু ছবি (JPG/PNG) বা PDF আপলোড করা যাবে`, files: {} };
    }

    try {
      const res = await fetch(url.toString(), { headers: { Range: 'bytes=0-15' } });
      if (!res.ok && res.status !== 206) {
          return { ok: false, error: `"${field.label}" — ফাইলটি যাচাই করা যায়নি`, files: {} };
      }
      const buf = await res.arrayBuffer();
      const head = new Uint8Array(buf.slice(0, 16));
      if (!matchesMagic(mime, head)) {
          return { ok: false, error: `"${field.label}" — ফাইলের ধরন সঠিক নয়`, files: {} };
      }
    } catch (err) {
      return { ok: false, error: `"${field.label}" — ফাইলটি যাচাই করা যায়নি`, files: {} };
    }

    files[field.name] = url.toString();
  }

  return { ok: true, files };
}
