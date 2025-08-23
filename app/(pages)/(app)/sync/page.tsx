'use client';

import { Button } from '@/components/ui/button';
import useEnrollments from '../../_hooks/useEnrollments';
// import { format } from 'date-fns';

export default function SyncPage() {
  // This hook needs to be updated to fetch the latest transaction for each account.
  // The data structure should look like: enrollment.accounts[i].transactions[0].date
  const { loading, enrollments, error } = useEnrollments();

  const handleSyncAll = () => {
    // TODO: Implement logic to trigger a sync for all linked accounts
    console.log('Syncing all accounts...');
  };

  const handleSyncAccount = (accountId: string) => {
    // TODO: Implement logic to trigger a sync for a single account
    console.log(`Syncing account ${accountId}...`);
  };

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
        <Button onClick={handleSyncAll}>Sync All Accounts</Button>
      </div>

      <div className="space-y-8">
        {enrollments.map(
          (enrollment) =>
            // We only want to show enrollments that have at least one linked account
            enrollment.accounts.some((acc) => acc.actualAccountId) && (
              <div key={enrollment.id}>
                <h2 className="text-xl font-semibold mb-4">
                  {enrollment.bankName}
                </h2>
                <div className="space-y-4">
                  {enrollment.accounts.map(
                    (account) =>
                      // Only display accounts that are linked to an Actual Budget account
                      account.actualAccountId && (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{account.name}</p>
                            {/* <p className="text-sm text-muted-foreground">
                              Last transaction pulled:{' '}
                              {account.transactions &&
                              account.transactions.length > 0 ? (
                                <span className="font-semibold text-primary">
                                  {format(
                                    new Date(account.transactions[0].date),
                                    'PPP p'
                                  )}
                                </span>
                              ) : (
                                <span className="italic">Never synced</span>
                              )}
                            </p> */}
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => handleSyncAccount(account.id)}
                          >
                            Sync
                          </Button>
                        </div>
                      )
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
