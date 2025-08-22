'use server';

import { getEnrollments } from '@/app/(api)/_datalib/teller/enrollments/getEnrollment';

export async function getEnrollmentsAction() {
  try {
    const enrollment = await getEnrollments();
    return { ok: true, body: enrollment, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
