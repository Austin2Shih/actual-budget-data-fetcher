import prisma from '@api/_utils/prisma/prismaClient';

export async function linkAccount({
  accountId,
  actualAccountId,
}: {
  accountId: string;
  actualAccountId: string | null;
}) {
  const updateRes = await prisma.account.update({
    where: { id: accountId },
    data: {
      actualAccountId,
    },
  });

  return updateRes;
}
