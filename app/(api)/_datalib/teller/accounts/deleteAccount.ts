import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function deleteAccount(accountId: string) {
  return prisma.account.delete({
    where: {
      id: accountId,
    },
  });
}
