'use server';

import { createAccount } from '@api/_datalib/teller/accounts/createAccount';

export async function createAccountAction({
  accountId,
  name,
  subtype,
  enrollmentId,
}: {
  accountId: string;
  name: string;
  subtype: string;
  enrollmentId: string;
}) {
  try {
    const account = await createAccount({
      accountId,
      name,
      subtype,
      enrollmentId,
    });

    return { ok: true, body: account, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
