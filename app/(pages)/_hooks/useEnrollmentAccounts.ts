'use client';

import { useCallback, useState } from 'react';
import { Account } from '@/lib/generated/prisma';
import { getEnrollmentAccountsAction } from '@/app/(api)/_actions/teller/enrollments/getEnrollmentAccounts';

export default function useEnrollmentAccounts() {
  const [enrollmentAccounts, setEnrollmentAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollmentAccounts = useCallback(async (enrollmentId: string) => {
    setLoading(true);
    setError(null);
    const enrollmentAccountsRes =
      await getEnrollmentAccountsAction(enrollmentId);
    if (enrollmentAccountsRes.ok) {
      setEnrollmentAccounts(enrollmentAccountsRes.body as Account[]);
    } else {
      setError(enrollmentAccountsRes.error?.message || '');
    }
    setLoading(false);
  }, []);

  return {
    enrollmentAccounts,
    loading,
    error,
    fetchEnrollmentAccounts,
  };
}
