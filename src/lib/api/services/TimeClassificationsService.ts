/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedTimeClassification } from '../models/PatchedTimeClassification';
import type { TimeClassification } from '../models/TimeClassification';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TimeClassificationsService {
    /**
     * @returns TimeClassification
     * @throws ApiError
     */
    public static timeClassificationsList(): CancelablePromise<Array<TimeClassification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/time-classifications/',
        });
    }
    /**
     * @param requestBody
     * @returns TimeClassification
     * @throws ApiError
     */
    public static timeClassificationsCreate(
        requestBody: TimeClassification,
    ): CancelablePromise<TimeClassification> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/time-classifications/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this time classification.
     * @returns TimeClassification
     * @throws ApiError
     */
    public static timeClassificationsRetrieve(
        id: number,
    ): CancelablePromise<TimeClassification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/time-classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this time classification.
     * @param requestBody
     * @returns TimeClassification
     * @throws ApiError
     */
    public static timeClassificationsUpdate(
        id: number,
        requestBody: TimeClassification,
    ): CancelablePromise<TimeClassification> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/time-classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this time classification.
     * @param requestBody
     * @returns TimeClassification
     * @throws ApiError
     */
    public static timeClassificationsPartialUpdate(
        id: number,
        requestBody?: PatchedTimeClassification,
    ): CancelablePromise<TimeClassification> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/time-classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this time classification.
     * @returns void
     * @throws ApiError
     */
    public static timeClassificationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/time-classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
