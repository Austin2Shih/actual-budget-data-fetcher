'use client';
import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/lib/generated/prisma';
import { getLatestTransactionAction } from '@/app/(api)/_actions/transactions/getTransactions';

export default function useLatestTransaction(accountId: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [latestTransaction, setLatestTransaction] =
    useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestTransaction = useCallback(async () => {
    const res = await getLatestTransactionAction(accountId);
    if (res.ok) {
      setLatestTransaction(res.body);
    } else {
      setLatestTransaction(null);
      setError(res.error?.message || '');
    }

    setLoading(false);
  }, [accountId]);

  useEffect(() => {
    fetchLatestTransaction();
  }, [accountId, fetchLatestTransaction]);

  return {
    loading,
    latestTransaction,
    error,
    fetchLatestTransaction,
  };
}
