/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedStatement } from '../models/PatchedStatement';
import type { Statement } from '../models/Statement';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatementsService {
    /**
     * @param account Filter by account ID
     * @param dateFrom Filter statements with period_end on or after this date (ISO 8601, e.g. 2025-01-01)
     * @param dateTo Filter statements with period_end on or before this date (ISO 8601, e.g. 2025-12-31)
     * @param sortBy Sort field. Prefix with "-" for descending. Allowed: id, account__name, period_start, period_end, opening_balance, closing_balance.
     * @returns Statement
     * @throws ApiError
     */
    public static statementsList(
        account?: number,
        dateFrom?: string,
        dateTo?: string,
        sortBy?: string,
    ): CancelablePromise<Array<Statement>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/statements/',
            query: {
                'account': account,
                'date_from': dateFrom,
                'date_to': dateTo,
                'sort_by': sortBy,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Statement
     * @throws ApiError
     */
    public static statementsCreate(
        requestBody: Statement,
    ): CancelablePromise<Statement> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/statements/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this statement.
     * @returns Statement
     * @throws ApiError
     */
    public static statementsRetrieve(
        id: number,
    ): CancelablePromise<Statement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/statements/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this statement.
     * @param requestBody
     * @returns Statement
     * @throws ApiError
     */
    public static statementsUpdate(
        id: number,
        requestBody: Statement,
    ): CancelablePromise<Statement> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/statements/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this statement.
     * @param requestBody
     * @returns Statement
     * @throws ApiError
     */
    public static statementsPartialUpdate(
        id: number,
        requestBody?: PatchedStatement,
    ): CancelablePromise<Statement> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/statements/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this statement.
     * @returns void
     * @throws ApiError
     */
    public static statementsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/statements/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
