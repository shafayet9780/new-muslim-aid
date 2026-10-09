import { auth } from '@/auth';

/**
 * বর্তমান session admin কি না যাচাই করে।
 * admin না হলে null রিটার্ন করে (caller 401/403 দিবে)।
 */
export async function requireAdmin() {
  let session = null;
  try {
    session = await auth();
  } catch {
    return null;
  }
  if (!session?.user) return null;
  const role = (session.user as { role?: string }).role;
  if (role !== 'admin') return null;
  return session;
}
