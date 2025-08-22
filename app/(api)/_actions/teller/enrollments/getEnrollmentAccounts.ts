'use server';

import { getEnrollmentAccounts } from '@api/_datalib/teller/enrollments/getEnrollmentAccounts';

export async function getEnrollmentAccountsAction(enrollmentId: string) {
  try {
    const accounts = await getEnrollmentAccounts(enrollmentId);
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
