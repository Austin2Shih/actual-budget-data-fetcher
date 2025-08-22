'use client';
import { getActualAccountsAction } from '@/app/(api)/_actions/actual/accounts/getActualAccounts';
import { useState, useEffect } from 'react';

export function useActualAccounts() {
  const [loading, setLoading] = useState(false);
  const [actualAccounts, setActualAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchActualAccounts = async () => {
    setLoading(true);
    setError(null);
    const actualAccountsRes = await getActualAccountsAction();
    if (actualAccountsRes.ok) {
      setActualAccounts(actualAccountsRes.body!);
    } else {
      setError(actualAccountsRes.error?.message || '');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActualAccounts();
  }, []);

  return {
    loading,
    actualAccounts,
    error,
    fetchActualAccounts,
  };
}
