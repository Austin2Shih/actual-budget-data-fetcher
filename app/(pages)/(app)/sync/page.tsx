'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import useEnrollments from '../../_hooks/useEnrollments';
import EnrollmentGroup from '../../_components/AccountSync/EnrollmentGroup';
import { Loader2 } from 'lucide-react';
import { syncCreateTransactions } from '@/app/(api)/_actions/sync/syncCreateTransactions';
import { syncDeleteTransactions } from '@/app/(api)/_actions/sync/syncDeleteTransactions';
import type { LatestTransactionSyncHandle } from '../../_components/AccountSync/AccountSyncCard';

export default function SyncPage() {
  const { loading, enrollments, error } = useEnrollments();
  const [syncingAccountIds, setSyncingAccountIds] = useState<string[]>([]);
  const [resetingAccountIds, setResetingAccountIds] = useState<string[]>([]);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const accountCardRefs = useRef<{
    [key: string]: LatestTransactionSyncHandle;
  }>({});

  const updateLatestTransactions = async () => {
    await Promise.all(
      Object.values(accountCardRefs.current).map((handle: any) =>
        handle.updateLatestTransaction()
      )
    );
  };

  const handleSyncAccount = async (enrollmentId: string, accountId: string) => {
    setSyncingAccountIds((prev) => [...prev, accountId]);
    try {
      await syncCreateTransactions({ enrollmentId, accountId });
      updateLatestTransactions();
    } catch (err) {
      console.error(`Failed to sync account ${accountId}:`, err);
    } finally {
      setSyncingAccountIds((prev) => prev.filter((id) => id !== accountId));
    }
  };

  const handleResetAccount = async (actualAccountId: string) => {
    setResetingAccountIds((prev) => [...prev, actualAccountId]);
    try {
      await syncDeleteTransactions({ accountId: actualAccountId });
      updateLatestTransactions();
    } catch (err) {
      console.error(`Failed to reset account ${actualAccountId}:`, err);
    } finally {
      setResetingAccountIds((prev) =>
        prev.filter((id) => id !== actualAccountId)
      );
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
          syncCreateTransactions({
            enrollmentId: account.enrollmentId,
            accountId: account.id,
          })
        )
      );
      updateLatestTransactions();
    } catch (err) {
      console.error('Failed during "Sync All":', err);
    } finally {
      setIsSyncingAll(false);
      setSyncingAccountIds([]);
    }
  };

  const isProcessing =
    syncingAccountIds.length > 0 ||
    resetingAccountIds.length > 0 ||
    isSyncingAll;

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
        <Button onClick={handleSyncAll} disabled={isProcessing}>
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
            resetingAccountIds={resetingAccountIds}
            onSyncAccount={handleSyncAccount}
            onResetAccount={handleResetAccount}
            ref={accountCardRefs}
          />
        ))}
      </div>
    </div>
  );
}
