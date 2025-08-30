'use server';

import { linkLocalAccount } from '../../_datalib/localAccounts/linkLocalAccount';

export async function unlinkLocalAccountAction({
  accountId,
}: {
  accountId: string;
}) {
  try {
    const updateRes = await linkLocalAccount({
      accountId,
      actualAccountId: null,
    });
    return { ok: true, body: updateRes, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
