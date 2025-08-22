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

interface AccountCardProps {
  account: Account;
  actualAccounts: any[];
}

export function AccountCard({ account, actualAccounts }: AccountCardProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    account.actualAccountId
  );
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!selectedAccountId) return;

    startTransition(() => {
      // linkAccountToAction(account.id, selectedAccountId);
    });
  };

  const isLinked = account.actualAccountId !== null;
  const showSaveButton =
    selectedAccountId && selectedAccountId !== account.actualAccountId;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{account.name}</CardTitle>
        <p className="text-sm text-muted-foreground capitalize">
          {account.subtype.replace(/_/g, ' ')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Link to Actual Account</label>
          <Select
            onValueChange={setSelectedAccountId}
            defaultValue={account.actualAccountId ?? undefined}
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
            <p className="text-xs text-green-600 mt-2">✓ Linked</p>
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
