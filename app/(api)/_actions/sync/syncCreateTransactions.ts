'use server';
import { getBankTransactions } from '../../_datalib/banks/getBankTransactions';
import { createBudgetTransactions } from '../../_datalib/budgetTransactions/createBudgetTransaction';
import { getLocalAccountById } from '../../_datalib/localAccounts/getLocalAccount';
import { createLocalTransactions } from '../../_datalib/localTransactions/createLocalTransaction';
import {
  formatTransaction,
  formatTransactionForActual,
} from '../../_utils/transactions/formatTransaction';

export async function syncCreateTransactions({
  enrollmentId,
  accountId,
  fromId,
}: {
  enrollmentId: string;
  accountId: string;
  fromId?: string;
}) {
  const rawTransactions = await getBankTransactions({
    enrollmentId,
    accountId,
    fromId,
  });
  const account = await getLocalAccountById(accountId);

  const actualTransactions =
    rawTransactions.map((transaction) =>
      formatTransactionForActual(
        transaction,
        account?.actualAccountId as string
      )
    ) || [];

  const prismaTransactions = rawTransactions.map(formatTransaction) || [];

  try {
    const actualApiRes = await createBudgetTransactions(
      account?.actualAccountId as string,
      actualTransactions
    );

    const databaseRes = await createLocalTransactions(prismaTransactions);

    return { ok: true, body: { actualApiRes, databaseRes }, error: null };
  } catch (error) {
    console.error(error);
    return { ok: false, body: null, error: error as Error };
  }
}
