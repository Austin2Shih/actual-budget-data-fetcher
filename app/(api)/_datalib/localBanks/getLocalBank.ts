import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getLocalBanks() {
  return prisma.enrollment.findMany({
    include: {
      accounts: true,
    },
  });
}

export async function getLocalBankById(id: string) {
  return prisma.enrollment.findUnique({
    where: {
      id,
    },
    include: {
      accounts: true,
    },
  });
}
