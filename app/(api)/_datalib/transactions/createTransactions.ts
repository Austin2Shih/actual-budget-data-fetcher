import { Transaction } from '@/lib/generated/prisma';
import prisma from '@api/_utils/prisma/prismaClient';

export async function createTransaction(transactionData: Transaction) {
  return prisma.transaction.create({
    data: transactionData,
  });
}
