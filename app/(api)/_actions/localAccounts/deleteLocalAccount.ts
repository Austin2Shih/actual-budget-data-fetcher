'use server';
import { deleteLocalAccount } from '../../_datalib/localAccounts/deleteLocalAccount';

export async function deleteLocalAccountAction(accountId: string) {
  try {
    const deleteRes = await deleteLocalAccount(accountId);
    return { ok: true, body: deleteRes, error: null };
  } catch (error) {
    return { ok: false, body: null, error: error as Error };
  }
}
