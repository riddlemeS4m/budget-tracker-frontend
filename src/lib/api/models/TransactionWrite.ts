export type TransactionWrite = {
    transaction_date?: string | null;
    posted_date?: string | null;
    description?: string | null;
    description_2?: string | null;
    category?: string | null;
    subcategory?: string | null;
    amount?: string | null;
    raw_data: unknown;
    account: number;
    file_upload?: number | null;
};
