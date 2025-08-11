import fetch from 'node-fetch';
import getHttpAgent from '../../_utils/teller/getHttpAgent';

export default async function getAccounts() {
  const agent = await getHttpAgent();
  const response = await fetch('https://api.teller.io/accounts', {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.TELLER_TOKEN + ':').toString('base64')}`,
    },
    agent: agent,
  });
  return response.json();
}
