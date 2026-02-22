/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileUpload } from '../models/FileUpload';
import type { PatchedFileUpload } from '../models/PatchedFileUpload';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FileUploadsService {
    /**
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsList(): CancelablePromise<Array<FileUpload>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file-uploads/',
        });
    }
    /**
     * @param requestBody
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsCreate(
        requestBody: FileUpload,
    ): CancelablePromise<FileUpload> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file-uploads/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this file upload.
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsRetrieve(
        id: number,
    ): CancelablePromise<FileUpload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file-uploads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this file upload.
     * @param requestBody
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsUpdate(
        id: number,
        requestBody: FileUpload,
    ): CancelablePromise<FileUpload> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/file-uploads/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this file upload.
     * @param requestBody
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsPartialUpdate(
        id: number,
        requestBody?: PatchedFileUpload,
    ): CancelablePromise<FileUpload> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/file-uploads/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this file upload.
     * @returns void
     * @throws ApiError
     */
    public static fileUploadsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/file-uploads/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
