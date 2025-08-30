'use client';

import type { Account } from '@/lib/generated/prisma';
import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { linkLocalAccountAction } from '@/app/(api)/_actions/localAccounts/linkLocalAccount';
import { unlinkLocalAccountAction } from '@/app/(api)/_actions/localAccounts/unlinkLocalAccount';
import { X } from 'lucide-react';

interface AccountCardProps {
  account: Account;
  actualAccounts: any[];
}

export function AccountCard({ account, actualAccounts }: AccountCardProps) {
  const [currentAccount, setCurrentAccount] = useState(account);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    currentAccount.actualAccountId
  );
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!selectedAccountId) return;

    startTransition(async () => {
      await linkLocalAccountAction({
        accountId: currentAccount.id,
        actualAccountId: selectedAccountId,
      });
      // Update local state to reflect the change immediately
      setCurrentAccount((prev) => ({
        ...prev,
        actualAccountId: selectedAccountId,
      }));
    });
  };

  const handleUnlink = () => {
    startTransition(async () => {
      await unlinkLocalAccountAction({ accountId: currentAccount.id });
      // Update local state to reflect the change immediately
      setCurrentAccount((prev) => ({ ...prev, actualAccountId: null }));
      setSelectedAccountId(null);
    });
  };

  const isLinked = currentAccount.actualAccountId !== null;
  const showSaveButton =
    selectedAccountId && selectedAccountId !== currentAccount.actualAccountId;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{currentAccount.name}</CardTitle>
        <p className="text-sm text-muted-foreground capitalize">
          {currentAccount.subtype.replace(/_/g, ' ')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Link to Actual Account</label>
          <Select
            onValueChange={setSelectedAccountId}
            value={selectedAccountId ?? ''} // Use value for controlled component
            defaultValue={currentAccount.actualAccountId ?? undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an account..." />
            </SelectTrigger>
            <SelectContent>
              {actualAccounts.map((actualAcct) => (
                <SelectItem key={actualAcct.id} value={actualAcct.id}>
                  {actualAcct.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLinked && !showSaveButton && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-green-600">✓ Linked</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-2 py-1 text-xs text-muted-foreground"
                onClick={handleUnlink}
                disabled={isPending}
              >
                <X className="h-3 w-3 mr-1" />
                Unlink
              </Button>
            </div>
          )}
        </div>
        {showSaveButton && (
          <Button onClick={handleSave} disabled={isPending} className="w-full">
            {isPending ? 'Saving...' : 'Save Link'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
