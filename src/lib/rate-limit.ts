/**
 * সহজ in-memory rate limiter (IP ভিত্তিক, sliding window)।
 * Serverless এ প্রতিটি instance এর আলাদা memory থাকে, তাই এটা
 * পুরোপুরি নিখুঁত না — তবে একই জায়গা থেকে spam/email flood অনেকটাই ঠেকায়।
 * আরও শক্ত সুরক্ষা লাগলে Upstash/Redis ভিত্তিক limiter ব্যবহার করুন।
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);

  // memory যেন অসীমভাবে না বাড়ে
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return true;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}
