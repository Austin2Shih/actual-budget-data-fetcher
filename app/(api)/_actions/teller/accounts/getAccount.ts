'use server';

import { getAccounts } from '@/app/(api)/_datalib/teller/accounts/getAccount';

export async function getAccountsAction() {
  try {
    const accounts = await getAccounts();
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
