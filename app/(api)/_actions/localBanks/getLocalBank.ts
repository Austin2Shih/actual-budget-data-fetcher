'use server';

import { getLocalBanks } from '../../_datalib/localBanks/getLocalBank';

export async function getLocalBanksAction() {
  try {
    const bank = await getLocalBanks();
    return { ok: true, body: bank, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
