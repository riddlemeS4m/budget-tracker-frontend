/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationClassificationTypeEnum } from './LocationClassificationTypeEnum';
export type LocationClassification = {
    readonly id: number;
    name: string;
    type: LocationClassificationTypeEnum;
    readonly transaction_count: number;
    readonly subcategory_count: number;
    readonly created_at: string;
    readonly updated_at: string;
};

