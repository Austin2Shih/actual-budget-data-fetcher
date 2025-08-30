'use server';
import {
  getLocalTransactions,
  getLocalTransactionById,
  getLatestLocalTransaction,
} from '../../_datalib/localTransactions/getLocalTransaction';

export async function getLocalTransactionsAction() {
  try {
    const transactions = await getLocalTransactions();
    return { ok: true, body: transactions, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}

export async function getLocalTransactionByIdAction(id: string) {
  try {
    const transaction = await getLocalTransactionById(id);
    return { ok: true, body: transaction, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}

export async function getLatestLocalTransactionAction(accountId: string) {
  try {
    const transaction = await getLatestLocalTransaction(accountId);
    return { ok: true, body: transaction, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
