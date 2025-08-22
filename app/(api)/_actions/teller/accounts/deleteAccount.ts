'use server';
import { deleteAccount } from '@/app/(api)/_datalib/teller/accounts/deleteAccount';

export async function deleteAccountAction(accountId: string) {
  try {
    const deleteRes = await deleteAccount(accountId);
    return { ok: true, body: deleteRes, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
