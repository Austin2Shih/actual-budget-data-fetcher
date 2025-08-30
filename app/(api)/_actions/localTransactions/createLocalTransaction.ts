'use server';
import type { Transaction } from '@/lib/generated/prisma';
import { createLocalTransaction } from '../../_datalib/localTransactions/createLocalTransaction';

export async function createLocalTransactionAction(
  transactionData: Transaction
) {
  try {
    const transaction = await createLocalTransaction(transactionData);
    return { ok: true, body: transaction, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
