'use server';

import { getEnrollmentAccounts } from '@/app/(api)/_datalib/teller/enrollments/getEnrollmentAccounts';

export async function getEnrollmentAccountsAction(enrollment_id: string) {
  try {
    const accounts = await getEnrollmentAccounts(enrollment_id);
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error };
  }
}
