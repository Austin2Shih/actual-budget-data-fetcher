import prisma from '../../_utils/prisma/prismaClient';

export function deleteLocalTransactionsByAccount(accountId: string) {
  return prisma.$transaction(async (tx) => {
    return tx.transaction.deleteMany({
      where: {
        accountId,
      },
    });
  });
}
