import getAccounts from '@/app/(api)/_datalib/teller/getAccounts';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await getAccounts();
  console.log(JSON.stringify(res));
  return new NextResponse();
}
