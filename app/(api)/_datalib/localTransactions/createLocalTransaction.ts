import { Transaction } from '@/lib/generated/prisma';
import prisma from '@api/_utils/prisma/prismaClient';

export async function createLocalTransaction(transactionData: Transaction) {
  return prisma.transaction.create({
    data: transactionData,
  });
}

export async function createLocalTransactions(transactions: any[]) {
  return prisma.$transaction(async (tx) => {
    return tx.transaction.createMany({
      data: transactions,
      skipDuplicates: true,
    });
  });
}
