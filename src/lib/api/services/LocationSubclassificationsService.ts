/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationSubClassification } from '../models/LocationSubClassification';
import type { PatchedLocationSubClassification } from '../models/PatchedLocationSubClassification';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationSubclassificationsService {
    /**
     * @returns LocationSubClassification
     * @throws ApiError
     */
    public static locationSubclassificationsList(): CancelablePromise<Array<LocationSubClassification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/location-subclassifications/',
        });
    }
    /**
     * @param requestBody
     * @returns LocationSubClassification
     * @throws ApiError
     */
    public static locationSubclassificationsCreate(
        requestBody: LocationSubClassification,
    ): CancelablePromise<LocationSubClassification> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/location-subclassifications/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this location sub classification.
     * @returns LocationSubClassification
     * @throws ApiError
     */
    public static locationSubclassificationsRetrieve(
        id: number,
    ): CancelablePromise<LocationSubClassification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/location-subclassifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this location sub classification.
     * @param requestBody
     * @returns LocationSubClassification
     * @throws ApiError
     */
    public static locationSubclassificationsUpdate(
        id: number,
        requestBody: LocationSubClassification,
    ): CancelablePromise<LocationSubClassification> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/location-subclassifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this location sub classification.
     * @param requestBody
     * @returns LocationSubClassification
     * @throws ApiError
     */
    public static locationSubclassificationsPartialUpdate(
        id: number,
        requestBody?: PatchedLocationSubClassification,
    ): CancelablePromise<LocationSubClassification> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/location-subclassifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this location sub classification.
     * @returns void
     * @throws ApiError
     */
    public static locationSubclassificationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/location-subclassifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
