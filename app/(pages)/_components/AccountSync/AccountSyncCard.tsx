'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import useLatestTransaction from '../../_hooks/useLatestTransaction';
import type { Account } from '@/lib/generated/prisma';
import { useImperativeHandle, forwardRef, ForwardedRef } from 'react';

interface AccountSyncCardProps {
  account: Account;
  isSyncing: boolean;
  isResetting: boolean;
  onSync: () => void;
  onReset: () => void;
}

export interface LatestTransactionSyncHandle {
  updateLatestTransaction: () => void;
}

const AccountSyncCard = forwardRef(
  (
    { account, isSyncing, isResetting, onSync, onReset }: AccountSyncCardProps,
    ref: ForwardedRef<LatestTransactionSyncHandle | null>
  ) => {
    const { loading, latestTransaction, error, fetchLatestTransaction } =
      useLatestTransaction(account.id);

    useImperativeHandle(ref, () => {
      return {
        updateLatestTransaction: () => {
          fetchLatestTransaction();
        },
      };
    }, [fetchLatestTransaction]);

    const isProcessing = isSyncing || isResetting;

    return (
      <div className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground">
        <div>
          <p className="font-medium">{account.name}</p>
          <p className="text-sm text-muted-foreground">
            {loading ? (
              'Loading last sync...'
            ) : error ? (
              'Error fetching status'
            ) : (
              <>
                Last transaction pulled:{' '}
                {latestTransaction ? (
                  <span className="font-semibold text-primary">
                    {format(new Date(latestTransaction.date), 'PPP p')}
                  </span>
                ) : (
                  <span className="italic">Never synced</span>
                )}
              </>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isProcessing}>
                {isResetting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset'
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete all transactions for "{account.name}"
                  from your Actual Budget instance. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onReset}>
                  Yes, reset account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="outline"
            size="sm"
            onClick={onSync}
            disabled={isProcessing}
          >
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
      </div>
    );
  }
);

AccountSyncCard.displayName = 'AccountSyncCard';
export default AccountSyncCard;
