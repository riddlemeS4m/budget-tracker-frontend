/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from './Account';
import type { StatusEnum } from './StatusEnum';
export type PatchedFileUpload = {
    readonly id?: number;
    readonly account?: Account;
    account_id?: number;
    filename?: string;
    readonly headers?: Array<string>;
    transaction_count?: number;
    status?: StatusEnum;
    errors?: string | null;
    readonly created_at?: string;
    readonly updated_at?: string;
};

