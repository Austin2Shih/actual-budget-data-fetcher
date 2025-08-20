import NextAuth from 'next-auth';
import { authOptions } from '@/app/(api)/_utils/auth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
