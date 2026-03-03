/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CashFlowStatementMonthly } from '../models/CashFlowStatementMonthly';
import type { CashFlowStatementSummary } from '../models/CashFlowStatementSummary';
import type { IncomeExpenseSummary } from '../models/IncomeExpenseSummary';
import type { StatementReconciliation } from '../models/StatementReconciliation';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportsService {
    /**
     * GET /api/v1/reports/cash-flow-statement/monthly/?year=2025
     * @param year The calendar year (e.g. 2025)
     * @returns CashFlowStatementMonthly
     * @throws ApiError
     */
    public static cashFlowStatementMonthly(
        year: number,
    ): CancelablePromise<CashFlowStatementMonthly> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/cash-flow-statement/monthly/',
            query: {
                'year': year,
            },
        });
    }
    /**
     * GET /api/v1/reports/cash-flow-statement/summary/
     * @param account Filter by account ID
     * @param dateFrom Start date (ISO 8601, e.g. 2025-01-01)
     * @param dateTo End date (ISO 8601, e.g. 2025-12-31)
     * @returns CashFlowStatementSummary
     * @throws ApiError
     */
    public static cashFlowStatementSummary(
        account?: number,
        dateFrom?: string,
        dateTo?: string,
    ): CancelablePromise<CashFlowStatementSummary> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/cash-flow-statement/summary/',
            query: {
                'account': account,
                'date_from': dateFrom,
                'date_to': dateTo,
            },
        });
    }
    /**
     * GET /api/v1/reports/income-expense-summary/summary/
     * @param account Filter by account ID
     * @param dateFrom Start date (ISO 8601, e.g. 2025-01-01)
     * @param dateTo End date (ISO 8601, e.g. 2025-12-31)
     * @returns IncomeExpenseSummary
     * @throws ApiError
     */
    public static incomeExpenseSummary(
        account?: number,
        dateFrom?: string,
        dateTo?: string,
    ): CancelablePromise<IncomeExpenseSummary> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/income-expense-summary/summary/',
            query: {
                'account': account,
                'date_from': dateFrom,
                'date_to': dateTo,
            },
        });
    }
    /**
     * GET /api/v1/reports/statement-reconciliation/
     * @param account Filter by account ID
     * @param year Filter by year of period_end
     * @returns StatementReconciliation
     * @throws ApiError
     */
    public static statementReconciliationList(
        account?: number,
        year?: number,
    ): CancelablePromise<Array<StatementReconciliation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/statement-reconciliation/',
            query: {
                'account': account,
                'year': year,
            },
        });
    }
}
