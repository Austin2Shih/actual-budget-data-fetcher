'use client';

import { EnrollmentWithAccounts } from '@/app/_types/EnrollmentWithAccounts';
import AccountSyncCard from './AccountSyncCard';
import type { LatestTransactionSyncHandle } from './AccountSyncCard';
import { ForwardedRef, forwardRef } from 'react';

interface EnrollmentGroupProps {
  enrollment: EnrollmentWithAccounts;
  syncingAccountIds: string[];
  resetingAccountIds: string[];
  onSyncAccount: (enrollmentId: string, accountId: string) => void;
  onResetAccount: (actualAccountId: string) => void;
}

const EnrollmentGroup = forwardRef(
  (
    {
      enrollment,
      syncingAccountIds,
      resetingAccountIds,
      onSyncAccount,
      onResetAccount,
    }: EnrollmentGroupProps,
    ref: ForwardedRef<{
      [key: string]: LatestTransactionSyncHandle | null;
    }>
  ) => {
    const linkedAccounts = enrollment.accounts.filter((a) => a.actualAccountId);

    if (linkedAccounts.length === 0) {
      return null;
    }

    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">{enrollment.bankName}</h2>
        <div className="space-y-4">
          {linkedAccounts.map((account) => (
            <AccountSyncCard
              key={account.id}
              account={account}
              isSyncing={syncingAccountIds.includes(account.id)}
              isResetting={resetingAccountIds.includes(
                account.actualAccountId!
              )}
              onSync={() => onSyncAccount(enrollment.id, account.id)}
              onReset={() => onResetAccount(account.actualAccountId!)}
              ref={(handle) => {
                if (typeof ref === 'object' && ref?.current) {
                  ref.current[account.id] = handle;
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

EnrollmentGroup.displayName = 'EnrollmentGroup';
export default EnrollmentGroup;
