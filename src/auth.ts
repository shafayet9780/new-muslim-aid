import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // NextAuth v5 uses AUTH_SECRET; fall back to NEXTAUTH_SECRET for compatibility
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/bn/auth/login',
    error: '/bn/auth/login',
  },
  cookies: {
    sessionToken: {
      name: `naf.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('ইমেইল এবং পাসওয়ার্ড দিন');
        }

        try {
          await connectDB();

          const user = await User.findOne({
            email: (credentials.email as string).toLowerCase().trim(),
          });

          if (!user) {
            throw new Error('এই ইমেইলে কোনো অ্যাকাউন্ট নেই');
          }

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );

          if (!isValid) {
            throw new Error('পাসওয়ার্ড সঠিক নয়');
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            referralCode: user.referralCode,
            role: user.role ?? 'user',
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.referralCode = (user as { referralCode?: string }).referralCode;
        token.role = (user as { role?: string }).role ?? 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as { referralCode?: string }).referralCode =
          token.referralCode as string;
        (session.user as { role?: string }).role =
          (token.role as string) ?? 'user';
      }
      return session;
    },
  },
});
