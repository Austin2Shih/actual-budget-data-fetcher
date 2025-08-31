'use server';
import { deleteBudgetTransactions } from '../../_datalib/budgetTransactions/deleteBudgetTransaction';
import { getLocalAccountById } from '../../_datalib/localAccounts/getLocalAccount';
import { deleteLocalTransactionsByAccount } from '../../_datalib/localTransactions/deleteLocalTransaction';

export async function syncDeleteTransactions({
  accountId,
}: {
  accountId: string;
}) {
  const account = await getLocalAccountById(accountId);

  try {
    const actualApiRes = await deleteBudgetTransactions(
      account?.actualAccountId as string
    );

    const databaseRes = await deleteLocalTransactionsByAccount(
      account?.actualAccountId as string
    );

    return { ok: true, body: { actualApiRes, databaseRes }, error: null };
  } catch (error) {
    console.error(error);
    return { ok: false, body: null, error: error as Error };
  }
}
