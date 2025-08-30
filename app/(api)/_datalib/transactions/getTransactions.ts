import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getTransactions() {
  return prisma.transaction.findMany({});
}

export async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: {
      id,
    },
  });
}

export async function getLatestTransaction(accountId: string) {
  return prisma.transaction.findFirst({
    where: {
      accountId: accountId,
    },
    orderBy: {
      date: 'desc',
    },
  });
}
