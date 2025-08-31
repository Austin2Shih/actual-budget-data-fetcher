import { sendActualRequest } from '../../_utils/actual/sendActualRequest';

export async function getBudgetTransactions(accountId: string) {
  return sendActualRequest(async (actualInstance) => {
    return actualInstance.getTransactions(accountId);
  });
}
