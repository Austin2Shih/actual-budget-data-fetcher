interface TellerTransaction {
  id: string;
  account_id: string;
  amount: string;
  details: {
    processing_status: string;
    category?: string | null;
  };
  description: string;
  date: string;
  type: string;
  status: string;
}
