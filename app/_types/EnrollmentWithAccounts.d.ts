import { Enrollment, Account } from '@/lib/generated/prisma';
type EnrollmentWithAccounts = Enrollment & { accounts: Account[] };
