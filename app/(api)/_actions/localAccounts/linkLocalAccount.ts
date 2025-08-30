'use server';

import { linkLocalAccount } from '../../_datalib/localAccounts/linkLocalAccount';

export async function linkLocalAccountAction({
  accountId,
  actualAccountId,
}: {
  accountId: string;
  actualAccountId: string;
}) {
  try {
    const updateRes = await linkLocalAccount({ accountId, actualAccountId });
    return { ok: true, body: updateRes, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
