'use client';
import { useState, useEffect, useCallback } from 'react';
import { getEnrollmentsAction } from '@/app/(api)/_actions/teller/enrollments/getEnrollment';
import { EnrollmentWithAccounts } from '@/app/_types/EnrollmentWithAccounts';

export default function useEnrollments() {
  const [loading, setLoading] = useState<boolean>(true);
  const [enrollments, setEnrollments] = useState<EnrollmentWithAccounts[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    const res = await getEnrollmentsAction();
    if (res.ok) {
      setEnrollments(res.body!);
    } else {
      setEnrollments([]);
      setError(res.error?.message || '');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    loading,
    enrollments,
    error,
    fetchEnrollments,
  };
}
