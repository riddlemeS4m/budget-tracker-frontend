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
     * POST /api/v1/file-uploads/
     * Accepts multipart/form-data with:
     * - account_id: account ID (required)
     * - file: a CSV file (optional)
     * When a file is provided, parses it and creates one Transaction per row.
     * Applies the account schema immediately if one exists.
     * @param formData
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsCreate(
        formData: FileUpload,
    ): CancelablePromise<FileUpload> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file-uploads/',
            formData: formData,
            mediaType: 'multipart/form-data',
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
    /**
     * POST /api/v1/file-uploads/{id}/process/
     * Re-processes all transactions for this FileUpload using the account schema.
     * @param id A unique integer value identifying this file upload.
     * @param requestBody
     * @returns FileUpload
     * @throws ApiError
     */
    public static fileUploadsProcess(
        id: number,
        requestBody: FileUpload,
    ): CancelablePromise<FileUpload> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file-uploads/{id}/process/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
