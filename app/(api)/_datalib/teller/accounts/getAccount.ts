import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getAccounts() {
  return prisma.account.findMany({});
}

export async function getAccountById(id: string) {
  return prisma.account.findUnique({
    where: {
      id,
    },
  });
}
