'use client';
import { useState, useEffect } from 'react';
import { getEnrollmentsAction } from '@/app/(api)/_actions/teller/enrollments/getEnrollment';
import { EnrollmentWithAccounts } from '@/app/_types/EnrollmentWithAccounts';

export default function useEnrollments() {
  const [loading, setLoading] = useState<boolean>(true);
  const [enrollments, setEnrollments] = useState<EnrollmentWithAccounts[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const res = await getEnrollmentsAction();
      if (res.ok) {
        setEnrollments(res.body!);
      } else {
        setEnrollments([]);
        setError(res.error as string);
      }

      setLoading(false);
    };

    fetchEnrollments();
  }, []);

  return {
    loading,
    enrollments,
    error,
  };
}
