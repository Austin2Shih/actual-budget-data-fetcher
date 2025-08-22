import { getActualApi } from '@/app/(api)/_utils/actual/actualClient';
import { pullActualData } from '@/app/(api)/_utils/actual/pullActualData';

export async function getActualAccounts() {
  const actual = await getActualApi();
  await pullActualData();
  return actual.getAccounts();
}
