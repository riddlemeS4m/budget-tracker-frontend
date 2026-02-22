/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedTransaction } from '../models/PatchedTransaction';
import type { Transaction } from '../models/Transaction';
import type { PaginatedResponse } from '../models/PaginatedResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * Handles GET /transactions/ with pagination
     * @param page Page number (1-indexed)
     * @param pageSize Items per page
     * @returns PaginatedResponse<Transaction>
     * @throws ApiError
     */
    public static transactionsList(
        page: number = 1,
        pageSize: number = 100,
    ): CancelablePromise<PaginatedResponse<Transaction>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/',
            query: {
                page,
                page_size: pageSize,
            },
        });
    }
    /**
     * Handles GET /transactions/ and POST /transactions/
     * @param requestBody
     * @returns Transaction
     * @throws ApiError
     */
    public static transactionsCreate(
        requestBody: Transaction,
    ): CancelablePromise<Transaction> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Handles GET /transactions/<id>/, PATCH /transactions/<id>/, DELETE /transactions/<id>/
     * @param id
     * @returns Transaction
     * @throws ApiError
     */
    public static transactionsRetrieve(
        id: number,
    ): CancelablePromise<Transaction> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Handles GET /transactions/<id>/, PATCH /transactions/<id>/, DELETE /transactions/<id>/
     * @param id
     * @param requestBody
     * @returns Transaction
     * @throws ApiError
     */
    public static transactionsPartialUpdate(
        id: number,
        requestBody?: PatchedTransaction,
    ): CancelablePromise<Transaction> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/transactions/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Handles GET /transactions/<id>/, PATCH /transactions/<id>/, DELETE /transactions/<id>/
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static transactionsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/transactions/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
