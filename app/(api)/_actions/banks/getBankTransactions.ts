'use server';

import { getBankTransactions } from '../../_datalib/banks/getBankTransactions';

export async function getBankTransactionsAction({
  enrollmentId,
  accountId,
  fromId,
}: {
  enrollmentId: string;
  accountId: string;
  fromId?: string;
}) {
  try {
    const transactions = await getBankTransactions({
      enrollmentId,
      accountId,
      fromId,
    });

    return { ok: true, body: transactions, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
