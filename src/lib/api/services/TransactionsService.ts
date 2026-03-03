/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedTransactionList } from '../models/PaginatedTransactionList';
import type { PatchedTransaction } from '../models/PatchedTransaction';
import type { Transaction } from '../models/Transaction';
import type { TransactionBatchUpdate } from '../models/TransactionBatchUpdate';
import type { TransactionBatchUpdateResponse } from '../models/TransactionBatchUpdateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * Handles GET /transactions/ and POST /transactions/
     * @param account Filter by account ID
     * @param accountType Filter by account type (e.g. payroll, checking, savings)
     * @param description Filter by description (case-insensitive substring match)
     * @param excludedAccountType Exclude accounts of the given type (e.g. payroll)
     * @param fileUpload Filter by file upload ID
     * @param locationClassification Filter by location classification ID
     * @param locationClassificationNull Pass 'true' to filter only transactions with no location classification
     * @param locationClassificationType Filter by location classification type (income, expense, transfer)
     * @param locationSubclassification Filter by location subclassification ID
     * @param page Page number (1-indexed)
     * @param pageSize Items per page
     * @param personClassification Filter by person classification ID
     * @param sortBy Sort field, optionally prefixed with '-' for descending (e.g. '-amount'). Allowed values: id, account__name, transaction_date, description, amount, category, subcategory. Defaults to -created_at.
     * @param timeClassification Filter by time classification ID
     * @param transactionDateFrom Filter transactions on or after this date (ISO 8601, e.g. 2025-01-01)
     * @param transactionDateTo Filter transactions on or before this date (ISO 8601, e.g. 2025-12-31)
     * @returns PaginatedTransactionList
     * @throws ApiError
     */
    public static transactionsList(
        account?: number,
        accountType?: string,
        description?: string,
        excludedAccountType?: string,
        fileUpload?: number,
        locationClassification?: number,
        locationClassificationNull?: string,
        locationClassificationType?: string,
        locationSubclassification?: number,
        page?: number,
        pageSize?: number,
        personClassification?: number,
        sortBy?: string,
        timeClassification?: number,
        transactionDateFrom?: string,
        transactionDateTo?: string,
    ): CancelablePromise<PaginatedTransactionList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/',
            query: {
                'account': account,
                'account_type': accountType,
                'description': description,
                'excluded_account_type': excludedAccountType,
                'file_upload': fileUpload,
                'location_classification': locationClassification,
                'location_classification_null': locationClassificationNull,
                'location_classification_type': locationClassificationType,
                'location_subclassification': locationSubclassification,
                'page': page,
                'page_size': pageSize,
                'person_classification': personClassification,
                'sort_by': sortBy,
                'time_classification': timeClassification,
                'transaction_date_from': transactionDateFrom,
                'transaction_date_to': transactionDateTo,
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
    /**
     * Update classification fields on multiple transactions at once. Only fields present in the request body are modified; omitted fields are left unchanged. Pass null to clear a classification.
     * @param requestBody
     * @returns TransactionBatchUpdateResponse
     * @throws ApiError
     */
    public static transactionsBatchUpdate(
        requestBody: TransactionBatchUpdate,
    ): CancelablePromise<TransactionBatchUpdateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions/batch-update/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Handles GET /transactions/export/ — streams all matching transactions as a CSV file.
     * @param account Filter by account ID
     * @param description Filter by description (case-insensitive substring match)
     * @param fileUpload Filter by file upload ID
     * @param locationClassification Filter by location classification ID
     * @param locationSubclassification Filter by location subclassification ID
     * @param personClassification Filter by person classification ID
     * @param sortBy Sort field, optionally prefixed with '-' for descending
     * @param timeClassification Filter by time classification ID
     * @param transactionDateFrom Filter transactions on or after this date (ISO 8601)
     * @param transactionDateTo Filter transactions on or before this date (ISO 8601)
     * @returns any No response body
     * @throws ApiError
     */
    public static transactionsExport(
        account?: number,
        description?: string,
        fileUpload?: number,
        locationClassification?: number,
        locationSubclassification?: number,
        personClassification?: number,
        sortBy?: string,
        timeClassification?: number,
        transactionDateFrom?: string,
        transactionDateTo?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/export/',
            query: {
                'account': account,
                'description': description,
                'file_upload': fileUpload,
                'location_classification': locationClassification,
                'location_subclassification': locationSubclassification,
                'person_classification': personClassification,
                'sort_by': sortBy,
                'time_classification': timeClassification,
                'transaction_date_from': transactionDateFrom,
                'transaction_date_to': transactionDateTo,
            },
        });
    }
}
