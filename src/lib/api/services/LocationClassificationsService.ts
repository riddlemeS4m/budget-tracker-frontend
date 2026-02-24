/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationClassification } from '../models/LocationClassification';
import type { PatchedLocationClassification } from '../models/PatchedLocationClassification';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationClassificationsService {
    /**
     * @returns LocationClassification
     * @throws ApiError
     */
    public static locationClassificationsList(): CancelablePromise<Array<LocationClassification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/location-classifications/',
        });
    }
    /**
     * @param requestBody
     * @returns LocationClassification
     * @throws ApiError
     */
    public static locationClassificationsCreate(
        requestBody: LocationClassification,
    ): CancelablePromise<LocationClassification> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/location-classifications/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this location classification.
     * @returns LocationClassification
     * @throws ApiError
     */
    public static locationClassificationsRetrieve(
        id: number,
    ): CancelablePromise<LocationClassification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/location-classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this location classification.
     * @param requestBody
     * @returns LocationClassification
     * @throws ApiError
     */
    public static locationClassificationsUpdate(
        id: number,
        requestBody: LocationClassification,
    ): CancelablePromise<LocationClassification> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/location-classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this location classification.
     * @param requestBody
     * @returns LocationClassification
     * @throws ApiError
     */
    public static locationClassificationsPartialUpdate(
        id: number,
        requestBody?: PatchedLocationClassification,
    ): CancelablePromise<LocationClassification> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/location-classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this location classification.
     * @returns void
     * @throws ApiError
     */
    public static locationClassificationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/location-classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
