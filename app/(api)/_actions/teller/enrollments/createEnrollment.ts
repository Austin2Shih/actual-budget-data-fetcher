'use server';

import { createEnrollment } from '@/app/(api)/_datalib/teller/enrollments/createEnrollment';

export async function createEnrollmentAction({
  enrollmentId,
  accessToken,
  bankName,
}: {
  enrollmentId: string;
  accessToken: string;
  bankName: string;
}) {
  try {
    const enrollment = await createEnrollment({
      enrollmentId,
      accessToken,
      bankName,
    });

    return { ok: true, body: enrollment, error: null };
  } catch (error) {
    return { ok: false, body: null, error };
  }
}
