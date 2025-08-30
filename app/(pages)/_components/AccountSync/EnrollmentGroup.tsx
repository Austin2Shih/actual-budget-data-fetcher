'use client';

import useLatestTransaction from '../../_hooks/useLatestTransaction';
import { AccountSyncCard } from './AccountSyncCard';
import type { Account, Enrollment } from '@/lib/generated/prisma';

interface EnrollmentGroupProps {
  enrollment: Enrollment & { accounts: Account[] };
  syncingAccountIds: string[];
  onSyncAccount: (enrollmentId: string, accountId: string) => void;
}

export function EnrollmentGroup({
  enrollment,
  syncingAccountIds,
  onSyncAccount,
}: EnrollmentGroupProps) {
  if (!enrollment.accounts.some((acc) => acc.actualAccountId)) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{enrollment.bankName}</h2>
      <div className="space-y-4">
        {enrollment.accounts.map(
          (account) =>
            account.actualAccountId && (
              <AccountWrapper
                key={account.id}
                account={account}
                isSyncing={syncingAccountIds.includes(account.id)}
                onSync={() => onSyncAccount(enrollment.id, account.id)}
              />
            )
        )}
      </div>
    </div>
  );
}

function AccountWrapper({
  account,
  isSyncing,
  onSync,
}: {
  account: Account;
  isSyncing: boolean;
  onSync: () => void;
}) {
  const { latestTransaction } = useLatestTransaction(account.id);

  return (
    <AccountSyncCard
      accountName={account.name}
      latestTransaction={latestTransaction}
      isSyncing={isSyncing}
      onSync={onSync}
    />
  );
}
