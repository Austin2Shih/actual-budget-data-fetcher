import fetch from 'node-fetch';
import getHttpAgent from '@/app/(api)/_utils/teller/getHttpAgent';
import { getEnrollmentById } from './getEnrollment';

export async function getEnrollmentAccounts(enrollment_id: string) {
  const agent = await getHttpAgent();
  const enrollment = await getEnrollmentById(enrollment_id);
  const res = await fetch('https://api.teller.io/accounts', {
    headers: {
      Authorization: `Basic ${Buffer.from(enrollment?.access_token + ':').toString('base64')}`,
    },
    agent: agent,
  });
  const resData = await res.json();
  console.log(resData);
  return resData;
}
