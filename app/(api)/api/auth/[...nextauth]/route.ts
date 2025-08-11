import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import refreshToken from '@api/_utils/auth/refreshToken';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent', // get refresh_token every time with google auth
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      return user.email === process.env.AUTHORIZED_USER;
    },
    async session({ session, token }) {
      (session as any).user.email = token.email;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.refreshToken = account.refresh_token;
        token.accessToken = account.access_token;
        token.email = user.email;
        token.expiresAt = account.expires_at! * 1000;
      }

      const refreshBuffer = 60 * 1000; // one minute
      if (Date.now() > (token.expiresAt as number) - refreshBuffer) {
        return refreshToken(token);
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/login',
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
