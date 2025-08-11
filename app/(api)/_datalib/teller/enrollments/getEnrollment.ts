import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getEnrollments() {
  return prisma.enrollment.findMany();
}
