'use client';

import { Enrollment, Account } from '@/lib/generated/prisma';
import { useEffect, useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { createAccountAction } from '@/app/(api)/_actions/teller/accounts/createAccount';
import useAccounts from '../../_hooks/useAccounts';
import useEnrollmentAccounts from '../../_hooks/useEnrollmentAccounts';
import { deleteAccountAction } from '@/app/(api)/_actions/teller/accounts/deleteAccount';

interface ManageAccountsModalProps {
  enrollment: Enrollment;
  children: React.ReactNode;
}

export function ManageAccountsModal({
  enrollment,
  children,
}: ManageAccountsModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    loading: enrollmentAccountsLoading,
    enrollmentAccounts,
    error: enrollmentAccountsError,
    fetchEnrollmentAccounts,
  } = useEnrollmentAccounts();
  const {
    loading: accountsLoading,
    accounts,
    error: accountsError,
    fetchAccounts,
  } = useAccounts();

  const isAccountSaved = (accountId: string) => {
    return accounts.map(({ id }) => id).includes(accountId);
  };

  useEffect(() => {
    fetchEnrollmentAccounts(enrollment.id);
  }, [enrollment.id, fetchEnrollmentAccounts]);

  const handleAccountChange = async (account: Account) => {
    startTransition(async () => {
      if (isAccountSaved(account.id)) {
        await deleteAccountAction(account.id);
      } else {
        await createAccountAction({
          accountId: account.id,
          name: account.name,
          subtype: account.subtype,
          enrollmentId: enrollment.id,
        });
      }

      fetchAccounts();
      fetchEnrollmentAccounts(enrollment.id);
    });
  };

  if (accountsLoading) {
    return <div className="p-6">Loading accounts...</div>;
  }

  if (accountsError) {
    return <div className="p-6 text-red-500">Error: {accountsError}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Accounts for {enrollment.bankName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {enrollmentAccountsLoading ? (
            <p className="text-center">Loading accounts...</p>
          ) : enrollmentAccountsError ? (
            <p>{enrollmentAccountsError}</p>
          ) : (
            enrollmentAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {account.subtype.replace(/_/g, ' ')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAccountChange(account)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isAccountSaved(account.id) ? (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  ) : (
                    <PlusCircle className="h-4 w-4 text-green-500" />
                  )}
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
