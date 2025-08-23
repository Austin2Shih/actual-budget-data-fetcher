'use server';

import { linkAccount } from '@/app/(api)/_datalib/teller/accounts/linkAccount';

export async function linkAccountAction({
  accountId,
  actualAccountId,
}: {
  accountId: string;
  actualAccountId: string;
}) {
  try {
    const updateRes = await linkAccount({ accountId, actualAccountId });
    return { ok: true, body: updateRes, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
