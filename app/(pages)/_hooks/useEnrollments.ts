'use client';

import { useState, useEffect } from 'react';
import { getEnrollmentsAction } from '@/app/(api)/_actions/teller/enrollments/getEnrollment';

export default function useEnrollments() {
  const [loading, setLoading] = useState<boolean>(true);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const res = await getEnrollmentsAction();
      if (res.ok) {
        setEnrollments(res.body as Enrollment[]);
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
