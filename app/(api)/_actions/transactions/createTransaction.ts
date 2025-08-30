'use server';
import type { Transaction } from '@/lib/generated/prisma';
import { createTransaction } from '../../_datalib/transactions/createTransactions';

export async function createTransactionAction(transactionData: Transaction) {
  try {
    const transaction = await createTransaction(transactionData);
    return { ok: true, body: transaction, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
