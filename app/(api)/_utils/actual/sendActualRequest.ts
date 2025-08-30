'use server';
import fs from 'fs';
import * as actual from '@actual-app/api';

const DATA_DIR = './tmp/actual-data';

export async function sendActualRequest(
  service: (actualInstance: any) => Promise<any>
) {
  try {
    await fs.promises.access(DATA_DIR);
  } catch {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await actual.init({
      dataDir: DATA_DIR,
      serverURL: process.env.ACTUAL_SERVER_URL,
      password: process.env.ACTUAL_PASSWORD,
    });

    await actual.downloadBudget(process.env.ACTUAL_SYNC_ID, {
      password: process.env.ACTUAL_PASSWORD,
    });

    const res = await service(actual);
    return res;
  } catch (error) {
    throw error;
  } finally {
    await actual.shutdown();
  }
}
