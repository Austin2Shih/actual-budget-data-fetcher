import { sendActualRequest } from '@/app/(api)/_utils/actual/sendActualRequest';

export async function getActualAccounts() {
  return sendActualRequest(async (actualInstance) => {
    return actualInstance.getAccounts();
  });
}
