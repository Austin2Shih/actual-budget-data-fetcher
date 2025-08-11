'use server';
import getAccounts from '../../_datalib/teller/getAccounts';

export default async function getAccountsAction() {
  return getAccounts();
}
