'use client';

import { Button } from '@/components/ui/button';
import { useTellerConnect } from 'teller-connect-react';
import { createEnrollmentAction } from '@/app/(api)/_actions/teller/enrollments/createEnrollment';
import useEnrollments from '../../_hooks/useEnrollments';
import { ManageAccountsModal } from '@pages/_components/ManageAccountsModal/ManageAccountsModal';
import { AccountCard } from '@pages/_components/AccountCard/AccountCard';
import { useActualAccounts } from '../../_hooks/useActualAccounts';

export default function AccountsPage() {
  const {
    loading: actualAccountsLoading,
    actualAccounts,
    error: actualAccountsError,
  } = useActualAccounts();

  const {
    loading: enrollmentsLoading,
    enrollments,
    error: enrollmentsError,
    fetchEnrollments,
  } = useEnrollments();

  const { open, ready } = useTellerConnect({
    applicationId: process.env.NEXT_PUBLIC_TELLER_APP_ID!,
    onSuccess: async (authorization) => {
      await createEnrollmentAction({
        enrollmentId: authorization.enrollment.id,
        accessToken: authorization.accessToken,
        bankName: authorization.enrollment.institution.name,
      });
      fetchEnrollments();
    },
  });

  const loading = actualAccountsLoading || enrollmentsLoading;
  const error = actualAccountsError || enrollmentsError;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bank Accounts</h1>
        <Button onClick={() => open()} disabled={!ready}>
          Connect a Bank Account
        </Button>
      </div>

      <div className="space-y-8">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold">{enrollment.bankName}</h2>
              <ManageAccountsModal
                enrollment={enrollment}
                onAccountAdd={fetchEnrollments}
              >
                <Button variant="outline">Manage Accounts</Button>
              </ManageAccountsModal>
            </div>

            {enrollment.accounts?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrollment.accounts.map((acct: any) => (
                  <AccountCard
                    key={acct.id}
                    account={acct}
                    actualAccounts={actualAccounts}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No accounts have been added from this connection yet. Click
                'Manage Accounts' to add some.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
