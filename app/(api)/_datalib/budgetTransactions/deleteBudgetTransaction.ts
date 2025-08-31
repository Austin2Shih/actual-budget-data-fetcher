import { sendActualRequest } from '../../_utils/actual/sendActualRequest';
import { getBudgetTransactions } from './getBudgetTransaction';

export async function deleteBudgetTransactions(accountId: string) {
  const transactions = await getBudgetTransactions(accountId);
  return sendActualRequest(async (actualInstance) => {
    return Promise.all(
      transactions.map((transaction: { id: string }) =>
        actualInstance.deleteTransaction(transaction.id)
      )
    );
  });
}
