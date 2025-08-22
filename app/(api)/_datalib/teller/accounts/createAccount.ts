import prisma from '@api/_utils/prisma/prismaClient';

export async function createAccount({
  accountId,
  name,
  subtype,
  enrollmentId,
}: {
  accountId: string;
  name: string;
  subtype: string;
  enrollmentId: string;
}) {
  const account = await prisma.account.create({
    data: {
      id: accountId,
      name,
      subtype,
      enrollmentId,
    },
  });

  return account;
}
