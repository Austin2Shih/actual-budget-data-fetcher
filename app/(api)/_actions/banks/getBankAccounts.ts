'use server';

import { getBankAccounts } from '../../_datalib/banks/getBankAccounts';

export async function getBankAccountsAction(enrollmentId: string) {
  try {
    const accounts = await getBankAccounts(enrollmentId);
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
