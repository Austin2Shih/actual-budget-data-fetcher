import { sendActualRequest } from '../../_utils/actual/sendActualRequest';

export function createBudgetTransactions(
  accountId: string,
  transactions: any[]
) {
  return sendActualRequest(async (actualInstance) => {
    return actualInstance.importTransactions(accountId, transactions);
  });
}
