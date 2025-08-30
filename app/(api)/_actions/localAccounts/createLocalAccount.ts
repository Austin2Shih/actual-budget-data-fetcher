'use server';

import { createLocalAccount } from '../../_datalib/localAccounts/createLocalAccount';

export async function createLocalAccountAction({
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
    const account = await createLocalAccount({
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
