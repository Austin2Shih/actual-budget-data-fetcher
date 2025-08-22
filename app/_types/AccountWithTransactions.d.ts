import { Account, Transaction } from '@/lib/generated/prisma';
type AccountWithTransactions = Account & { transactions: Transaction[] };
