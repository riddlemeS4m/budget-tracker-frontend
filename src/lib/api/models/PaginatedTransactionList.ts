/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Transaction } from './Transaction';
export type PaginatedTransactionList = {
    count: number;
    total_pages: number;
    page: number;
    page_size: number;
    results: Array<Transaction>;
};

