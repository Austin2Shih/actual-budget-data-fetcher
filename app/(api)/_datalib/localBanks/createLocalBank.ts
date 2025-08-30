import prisma from '@api/_utils/prisma/prismaClient';

export async function createLocalBank({
  enrollmentId,
  accessToken,
  bankName,
}: {
  enrollmentId: string;
  accessToken: string;
  bankName: string;
}) {
  const enrollment = await prisma.enrollment.create({
    data: {
      id: enrollmentId,
      accessToken: accessToken,
      bankName: bankName,
    },
  });

  return enrollment;
}
