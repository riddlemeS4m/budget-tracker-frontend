/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from './Account';
export type Statement = {
    readonly id: number;
    readonly account: Account;
    account_id: number;
    period_start?: string | null;
    period_end: string;
    opening_balance?: string | null;
    closing_balance: string;
    readonly created_at: string;
    readonly updated_at: string;
};

