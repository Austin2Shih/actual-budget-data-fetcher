import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import ProtectedDisplay from '../_components/ProtectedDisplay/ProtectedDisplay';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="text-lg font-bold">My Finance Dashboard</h1>
          <nav className="flex items-center gap-4">
            <Link href="/accounts">
              <Button variant="ghost">Accounts</Button>
            </Link>
            <Link href="/sync">
              <Button variant="ghost">Sync Data</Button>
            </Link>
            <form action="/api/auth/signout" method="POST">
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </form>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <ProtectedDisplay>
          <Card>
            <CardContent className="p-6">{children}</CardContent>
          </Card>
        </ProtectedDisplay>
      </main>
    </div>
  );
}
