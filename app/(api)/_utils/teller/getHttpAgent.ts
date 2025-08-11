import fs from 'fs';
import path from 'path';
import https, { Agent } from 'https';

let httpsAgent: Agent | null = null;

export default async function getHttpAgent() {
  if (httpsAgent) {
    return httpsAgent;
  }

  const certPath = path.resolve(
    process.env.TELLER_CERT_PATH!,
    'certificate.pem'
  );
  const keyPath = path.resolve(
    process.env.TELLER_CERT_PATH!,
    'private_key.pem'
  );

  try {
    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    httpsAgent = new https.Agent({ cert, key });
    return httpsAgent;
  } catch (error) {
    console.error('Failed to create HTTPS agent:', error);
    throw new Error('Failed to load client certificates.');
  }
}
