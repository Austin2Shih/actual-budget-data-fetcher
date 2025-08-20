"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { getEnrollmentAccountsAction } from "@api/_actions/teller/enrollments/getEnrollmentAccounts";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";

interface ManageAccountsModalProps {
  enrollment: Enrollment;
  children: React.ReactNode;
}

export function ManageAccountsModal({ enrollment, children }: ManageAccountsModalProps) {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      const fetchAccounts = async () => {
        setLoading(true);
        setError(null);
        const accountsRes = await getEnrollmentAccountsAction(enrollment.enrollment_id);
        if (accountsRes.ok) {
          setAccounts(accountsRes.body as Account[]);
        } else {
          setError(accountsRes.error as string)
        }
        setLoading(false);
      };

      fetchAccounts();
    }
  }, [open, enrollment.id]);

  // const handleAccountChange = async (account: Account) => {
  //   startTransition(async () => {
  //     if (account.isSaved) {
  //       await removeAccountAction(account.id);
  //     } else {
  //       await addAccountAction({
  //         accountId: account.id,
  //         accountName: account.name,
  //         accountSubtype: account.subtype,
  //         enrollmentId: enrollment.id,
  //       });
  //     }
  //     // After mutation, re-fetch to update the state of the modal buttons
  //     const updatedAccounts = await getAccountsForEnrollmentAction(enrollment.id);
  //     setAccounts(updatedAccounts);
  //   });
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Accounts for {enrollment.bank_name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {loading ? (
            <p className="text-center">Loading accounts...</p>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{account.subtype.replace(/_/g, " ")}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={() => handleAccountChange(account)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : false ? (
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