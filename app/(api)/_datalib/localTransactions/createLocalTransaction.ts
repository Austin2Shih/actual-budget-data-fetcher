import { Transaction } from '@/lib/generated/prisma';
import prisma from '@api/_utils/prisma/prismaClient';

export async function createLocalTransaction(transactionData: Transaction) {
  return prisma.transaction.create({
    data: transactionData,
  });
}
