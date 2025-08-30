'use server';

import { getLocalAccounts } from '../../_datalib/localAccounts/getLocalAccount';

export async function getLocalAccountsAction() {
  try {
    const accounts = await getLocalAccounts();
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
