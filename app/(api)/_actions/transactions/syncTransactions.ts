'use server';
import { getAccountById } from '../../_datalib/teller/accounts/getAccount';
import { getTransactionsPage } from '../../_datalib/teller/transactions/getTransactions';
import { sendActualRequest } from '../../_utils/actual/sendActualRequest';
import prisma from '../../_utils/prisma/prismaClient';
import {
  formatTransaction,
  formatTransactionForActual,
} from '../../_utils/transactions/formatTransaction';

export async function syncTransactionsAction({
  enrollmentId,
  accountId,
  fromId,
}: {
  enrollmentId: string;
  accountId: string;
  fromId?: string;
}) {
  const rawTransactions = await getTransactionsPage({
    enrollmentId,
    accountId,
    fromId,
  });
  const account = await getAccountById(accountId);

  const actualTransactions =
    rawTransactions.map((transaction) =>
      formatTransactionForActual(
        transaction,
        account?.actualAccountId as string
      )
    ) || [];

  const prismaTransactions = rawTransactions.map(formatTransaction) || [];

  try {
    const actualApiRes = await sendActualRequest(async (actualInstance) => {
      return actualInstance.importTransactions(
        account?.actualAccountId as string,
        actualTransactions
      );
    });

    const databaseRes = await prisma.$transaction(async (tx) => {
      return tx.transaction.createMany({
        data: prismaTransactions,
        skipDuplicates: true,
      });
    });

    return { ok: true, body: { actualApiRes, databaseRes }, error: null };
  } catch (error) {
    console.error(error);
    return { ok: false, body: null, error: error as Error };
  }
}
