'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useEnrollments from '../../_hooks/useEnrollments';
import { syncTransactionsAction } from '@/app/(api)/_actions/transactions/syncTransactions';
import { EnrollmentGroup } from '../../_components/AccountSync/EnrollmentGroup';
import { Loader2 } from 'lucide-react';

export default function SyncPage() {
  const { loading, enrollments, error, fetchEnrollments } = useEnrollments();
  const [syncingAccountIds, setSyncingAccountIds] = useState<string[]>([]);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const handleSyncAccount = async (enrollmentId: string, accountId: string) => {
    setSyncingAccountIds((prev) => [...prev, accountId]);

    try {
      await syncTransactionsAction({ enrollmentId, accountId });
      fetchEnrollments();
    } catch (err) {
      console.error(`Failed to sync account ${accountId}:`, err);
    } finally {
      setSyncingAccountIds((prev) => prev.filter((id) => id !== accountId));
    }
  };

  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    const allLinkedAccounts = enrollments
      .flatMap((e) => e.accounts)
      .filter((a) => a.actualAccountId);

    setSyncingAccountIds(allLinkedAccounts.map((a) => a.id));

    try {
      await Promise.all(
        allLinkedAccounts.map((account) =>
          syncTransactionsAction({
            enrollmentId: account.enrollmentId,
            accountId: account.id,
          })
        )
      );
      fetchEnrollments();
    } catch (err) {
      console.error('Failed during "Sync All":', err);
    } finally {
      setIsSyncingAll(false);
      setSyncingAccountIds([]);
    }
  };

  const isSyncing = syncingAccountIds.length > 0 || isSyncingAll;

  if (loading) {
    return <div className="p-6">Loading accounts...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold">Sync Bank Data</h1>
        <Button onClick={handleSyncAll} disabled={isSyncing}>
          {isSyncingAll ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing All...
            </>
          ) : (
            'Sync All Accounts'
          )}
        </Button>
      </div>

      <div className="space-y-8">
        {enrollments.map((enrollment) => (
          <EnrollmentGroup
            key={enrollment.id}
            enrollment={enrollment}
            syncingAccountIds={syncingAccountIds}
            onSyncAccount={handleSyncAccount}
          />
        ))}
      </div>
    </div>
  );
}
