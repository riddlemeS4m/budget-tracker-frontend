/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedPersonClassification } from '../models/PatchedPersonClassification';
import type { PersonClassification } from '../models/PersonClassification';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PersonClassificationsService {
    /**
     * @returns PersonClassification
     * @throws ApiError
     */
    public static personClassificationsList(): CancelablePromise<Array<PersonClassification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/person-classifications/',
        });
    }
    /**
     * @param requestBody
     * @returns PersonClassification
     * @throws ApiError
     */
    public static personClassificationsCreate(
        requestBody: PersonClassification,
    ): CancelablePromise<PersonClassification> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/person-classifications/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this person classification.
     * @returns PersonClassification
     * @throws ApiError
     */
    public static personClassificationsRetrieve(
        id: number,
    ): CancelablePromise<PersonClassification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/person-classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this person classification.
     * @param requestBody
     * @returns PersonClassification
     * @throws ApiError
     */
    public static personClassificationsUpdate(
        id: number,
        requestBody: PersonClassification,
    ): CancelablePromise<PersonClassification> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/person-classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this person classification.
     * @param requestBody
     * @returns PersonClassification
     * @throws ApiError
     */
    public static personClassificationsPartialUpdate(
        id: number,
        requestBody?: PatchedPersonClassification,
    ): CancelablePromise<PersonClassification> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/person-classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this person classification.
     * @returns void
     * @throws ApiError
     */
    public static personClassificationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/person-classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
