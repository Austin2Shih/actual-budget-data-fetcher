'use server';

import { getTransactionsPage } from '@/app/(api)/_datalib/teller/transactions/getTransactions';

export async function getTransactionsPageAction({
  enrollmentId,
  accountId,
  fromId,
}: {
  enrollmentId: string;
  accountId: string;
  fromId?: string;
}) {
  try {
    const transactions = await getTransactionsPage({
      enrollmentId,
      accountId,
      fromId,
    });

    return { ok: true, body: transactions, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
