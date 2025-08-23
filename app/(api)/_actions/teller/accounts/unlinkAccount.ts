'use server';

import { linkAccount } from '@/app/(api)/_datalib/teller/accounts/linkAccount';

export async function unlinkAccountAction({
  accountId,
}: {
  accountId: string;
}) {
  try {
    const updateRes = await linkAccount({ accountId, actualAccountId: null });
    return { ok: true, body: updateRes, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
