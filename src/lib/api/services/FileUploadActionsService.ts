import { OpenAPI } from "../core/OpenAPI";
import type { FileUpload } from "../models/FileUpload";

function getBaseUrl(): string {
  return OpenAPI.BASE || "http://localhost:8000";
}

export class FileUploadActionsService {
  static async processFileUpload(id: number): Promise<FileUpload> {
    const response = await fetch(`${getBaseUrl()}/api/v1/file-uploads/${id}/process/`, {
      method: "POST",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail ?? `Failed to process file upload: ${response.status}`);
    }

    return response.json();
  }
}
