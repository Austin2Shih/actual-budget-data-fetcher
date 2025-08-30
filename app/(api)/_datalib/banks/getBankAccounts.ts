import fetch from 'node-fetch';
import getHttpAgent from '@/app/(api)/_utils/teller/getHttpAgent';
import { getLocalBankById } from '../localBanks/getLocalBank';

export async function getBankAccounts(enrollmentId: string) {
  const agent = await getHttpAgent();
  const enrollment = await getLocalBankById(enrollmentId);
  const res = await fetch('https://api.teller.io/accounts', {
    headers: {
      Authorization: `Basic ${Buffer.from(enrollment?.accessToken + ':').toString('base64')}`,
    },
    agent: agent,
  });
  const resData = await res.json();
  return resData;
}
