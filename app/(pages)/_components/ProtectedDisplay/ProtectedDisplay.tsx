import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/(api)/_utils/auth/authOptions';
import { redirect } from 'next/navigation';

interface ProtectedDisplayProps {
  children: React.ReactNode;
}

export default async function ProtectedDisplay({
  children,
}: ProtectedDisplayProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return children;
}
