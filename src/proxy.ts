import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const intlMiddleware = createMiddleware({
  locales: ['bn'],
  defaultLocale: 'bn',
  localePrefix: 'always',
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes (handles any locale and both /dashboard or /dashboard/user or /user/dashboard)
  const dashboardRegex = /^\/([^/]+)\/(dashboard|user\/dashboard|dashboard\/user)/;
  const match = pathname.match(dashboardRegex);

  if (match) {
    const locale = match[1];
    let session = null;
    try {
      session = await auth();
    } catch {
      // JWTSessionError — stale cookie from old AUTH_SECRET; treat as unauthenticated
    }

    if (!session) {
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // admin route শুধুমাত্র admin role এর জন্য
    const isAdminRoute = /^\/[^/]+\/dashboard\/admin(\/|$)/.test(pathname);
    if (isAdminRoute) {
      const role = (session.user as { role?: string })?.role;
      if (role !== 'admin') {
        return NextResponse.redirect(new URL(`/${locale}/dashboard/user`, request.url));
      }
    }
  }

  // Apply next-intl middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(bn)/:path*'],
};