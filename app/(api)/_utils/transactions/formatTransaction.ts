export function formatTransactionForActual(
  transaction: TellerTransaction,
  actualAccountId: string
) {
  return {
    account: actualAccountId,
    date: transaction.date,
    amount: Math.round(+transaction.amount * 100),
    notes: transaction.description,
    imported_id: transaction.id,
  };
}

export function formatTransaction(transaction: TellerTransaction) {
  return {
    id: transaction.id,
    amount: +transaction.amount,
    date: new Date(transaction.date),
    description: transaction.description,
    type: transaction.type,
    category: transaction.details.category,
    status: transaction.details.processing_status,
    accountId: transaction.account_id,
  };
}
