'use client';
import { useState, useEffect } from 'react';
import { Account } from '@/lib/generated/prisma';
import { getLocalAccountsAction } from '@/app/(api)/_actions/localAccounts/getLocalAccount';

export default function useAccounts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    const res = await getLocalAccountsAction();
    if (res.ok) {
      setAccounts(res.body!);
    } else {
      setAccounts([]);
      setError(res.error?.message || '');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    loading,
    accounts,
    error,
    fetchAccounts,
  };
}
