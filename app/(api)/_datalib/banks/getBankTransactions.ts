import fetch from 'node-fetch';
import getHttpAgent from '@/app/(api)/_utils/teller/getHttpAgent';
import { getLocalBankById } from '../localBanks/getLocalBank';

export async function getBankTransactions({
  enrollmentId,
  accountId,
  fromId,
}: {
  enrollmentId: string;
  accountId: string;
  fromId?: string;
}) {
  const agent = await getHttpAgent();
  const enrollment = await getLocalBankById(enrollmentId);

  const baseUrl = `https://api.teller.io/accounts/${accountId}/transactions`;
  const params = new URLSearchParams();
  if (fromId) {
    params.append('from_id', fromId);
  }

  const res = await fetch(`${baseUrl}?${params.toString()}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(enrollment?.accessToken + ':').toString('base64')}`,
    },
    agent: agent,
  });

  const transactions = (await res.json()) as TellerTransaction[];

  return transactions.reverse();
}
