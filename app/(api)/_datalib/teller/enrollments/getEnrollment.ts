import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getEnrollments() {
  return prisma.enrollment.findMany({
    include: {
      accounts: true,
    },
  });
}

export async function getEnrollmentById(id: string) {
  return prisma.enrollment.findUnique({
    where: {
      id,
    },
    include: {
      accounts: true,
    },
  });
}
