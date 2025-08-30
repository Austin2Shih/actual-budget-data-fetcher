'use server';
import {
  getLatestTransaction,
  getTransactionById,
  getTransactions,
} from '../../_datalib/transactions/getTransactions';

export async function getTransactionsAction() {
  try {
    const transactions = await getTransactions();
    return { ok: true, body: transactions, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}

export async function getTransactionByIdAction(id: string) {
  try {
    const transaction = await getTransactionById(id);
    return { ok: true, body: transaction, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}

export async function getLatestTransactionAction(accountId: string) {
  try {
    const transaction = await getLatestTransaction(accountId);
    return { ok: true, body: transaction, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
