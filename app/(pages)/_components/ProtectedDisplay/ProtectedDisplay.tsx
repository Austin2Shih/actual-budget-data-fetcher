import { getServerSession } from 'next-auth';
import { authOptions } from '@api/api/auth/[...nextauth]/route';

interface ProtectedDisplayProps {
  children: React.ReactNode;
}

export default async function ProtectedDisplay({
  children,
}: ProtectedDisplayProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied</p>;
  }

  return children;
}
