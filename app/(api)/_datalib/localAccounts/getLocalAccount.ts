import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getLocalAccounts() {
  return prisma.account.findMany({});
}

export async function getLocalAccountById(id: string) {
  return prisma.account.findUnique({
    where: {
      id,
    },
  });
}
