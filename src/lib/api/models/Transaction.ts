/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from './Account';
import type { FileUpload } from './FileUpload';
export type Transaction = {
    readonly id: number;
    transaction_date?: string | null;
    posted_date?: string | null;
    description?: string | null;
    description_2?: string | null;
    category?: string | null;
    subcategory?: string | null;
    amount?: string | null;
    raw_data: any;
    readonly created_at: string;
    readonly updated_at: string;
    account: Account;
    file_upload?: FileUpload | null;
};

