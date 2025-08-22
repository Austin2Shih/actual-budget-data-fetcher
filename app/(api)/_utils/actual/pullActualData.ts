'use server';
import { getActualApi } from './actualClient';

export async function pullActualData() {
  const actual = await getActualApi();
  await actual.downloadBudget(process.env.ACTUAL_SYNC_ID, {
    password: process.env.ACTUAL_PASSWORD,
  });
}
