'use server';

import { getBudgetAccounts } from '../../_datalib/budgetAccounts/getBudgetAccount';

export async function getBudgetAccountsAction() {
  try {
    const accounts = await getBudgetAccounts();
    return { ok: true, body: accounts, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
