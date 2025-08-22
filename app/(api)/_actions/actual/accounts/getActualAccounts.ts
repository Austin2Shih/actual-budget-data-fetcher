'use server';

import { getActualAccounts } from '@/app/(api)/_datalib/actual/accounts/getActualAccounts';

export async function getActualAccountsAction() {
  try {
    const accounts = await getActualAccounts();
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
