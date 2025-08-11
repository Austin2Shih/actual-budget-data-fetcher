import prisma from '@/app/(api)/_utils/prisma/prismaClient';

export async function createEnrollment({
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
      enrollment_id: enrollmentId,
      access_token: accessToken,
      bank_name: bankName,
    },
  });

  return enrollment;
}
