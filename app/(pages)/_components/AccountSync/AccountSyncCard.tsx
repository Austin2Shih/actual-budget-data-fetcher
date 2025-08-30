'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Transaction } from '@/lib/generated/prisma';

interface AccountSyncCardProps {
  accountName: string;
  latestTransaction: Transaction | null;
  isSyncing: boolean;
  onSync: () => void;
}

export function AccountSyncCard({
  accountName,
  latestTransaction,
  isSyncing,
  onSync,
}: AccountSyncCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <p className="font-medium">{accountName}</p>
        <p className="text-sm text-muted-foreground">
          Last transaction pulled:{' '}
          {latestTransaction ? (
            <span className="font-semibold text-primary">
              {format(new Date(latestTransaction.date), 'PPP p')}
            </span>
          ) : (
            <span className="italic">Never synced</span>
          )}
        </p>
      </div>
      <Button variant="outline" onClick={onSync} disabled={isSyncing}>
        {isSyncing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Syncing...
          </>
        ) : (
          'Sync'
        )}
      </Button>
    </div>
  );
}
