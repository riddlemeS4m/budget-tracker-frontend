/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from './Account';
import type { FileUpload } from './FileUpload';
export type Transaction = {
    readonly id: number;
    readonly account: Account;
    account_id: number;
    readonly file_upload: FileUpload;
    file_upload_id?: number | null;
    transaction_date?: string | null;
    posted_date?: string | null;
    description?: string | null;
    description_2?: string | null;
    category?: string | null;
    subcategory?: string | null;
    amount?: string | null;
    raw_data: any;
    location_classification?: number | null;
    location_subclassification?: number | null;
    time_classification?: number | null;
    person_classification?: number | null;
    readonly created_at: string;
    readonly updated_at: string;
};

