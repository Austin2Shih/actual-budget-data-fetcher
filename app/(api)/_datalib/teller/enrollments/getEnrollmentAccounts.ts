import fetch from 'node-fetch';
import getHttpAgent from '@/app/(api)/_utils/teller/getHttpAgent';
import { getEnrollmentById } from './getEnrollment';

export async function getEnrollmentAccounts(enrollmentId: string) {
  const agent = await getHttpAgent();
  const enrollment = await getEnrollmentById(enrollmentId);
  const res = await fetch('https://api.teller.io/accounts', {
    headers: {
      Authorization: `Basic ${Buffer.from(enrollment?.accessToken + ':').toString('base64')}`,
    },
    agent: agent,
  });
  const resData = await res.json();
  return resData;
}
