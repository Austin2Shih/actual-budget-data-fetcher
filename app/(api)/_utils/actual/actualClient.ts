'use server';
import fs from 'fs';
import * as actual from '@actual-app/api';

const DATA_DIR = './tmp/actual-data';

let actualApiInstance: any;

export async function getActualApi() {
  if (actualApiInstance) {
    return actualApiInstance;
  }

  console.log('fetching actual instance');

  try {
    await fs.promises.access(DATA_DIR);
  } catch {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
  }

  await actual.init({
    dataDir: DATA_DIR,
    serverURL: process.env.ACTUAL_SERVER_URL,
    password: process.env.ACTUAL_PASSWORD,
  });

  actualApiInstance = actual;

  return actualApiInstance;
}
