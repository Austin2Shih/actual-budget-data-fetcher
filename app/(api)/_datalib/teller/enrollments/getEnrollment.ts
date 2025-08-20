import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function getEnrollments() {
  return prisma.enrollment.findMany();
}

export async function getEnrollmentById(id: string) {
  return prisma.enrollment.findUnique({
    where: {
      enrollment_id: id,
    },
  });
}
