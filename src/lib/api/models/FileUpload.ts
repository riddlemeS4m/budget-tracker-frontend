/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from './Account';
export type FileUpload = {
    readonly id: number;
    filename: string;
    transaction_count: number;
    status: string;
    errors?: string | null;
    readonly created_at: string;
    readonly updated_at: string;
    account: Account;
    readonly headers: string[];
};

