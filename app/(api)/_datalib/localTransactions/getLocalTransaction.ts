import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getLocalTransactions() {
  return prisma.transaction.findMany({});
}

export async function getLocalTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: {
      id,
    },
  });
}

export async function getLatestLocalTransaction(accountId: string) {
  return prisma.transaction.findFirst({
    where: {
      accountId: accountId,
    },
    orderBy: {
      date: 'desc',
    },
  });
}
