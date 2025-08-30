'use server';

import { createLocalBank } from '../../_datalib/localBanks/createLocalBank';

export async function createLocalBankAction({
  enrollmentId,
  accessToken,
  bankName,
}: {
  enrollmentId: string;
  accessToken: string;
  bankName: string;
}) {
  try {
    const bank = await createLocalBank({
      enrollmentId,
      accessToken,
      bankName,
    });

    return { ok: true, body: bank, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
