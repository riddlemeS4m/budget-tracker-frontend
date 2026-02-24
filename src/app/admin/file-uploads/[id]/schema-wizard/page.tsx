"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useFileUpload, useUpdateAccount, useProcessFileUpload } from "@/lib/hooks";
import SchemaWizardForm, { type FileUploadSchema } from "@/components/admin/file-uploads/SchemaWizardForm";

export default function SchemaWizardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const fileUploadId = Number(id);
  const router = useRouter();

  const { data: fileUpload, isLoading, isError: fileUploadError } =
    useFileUpload(fileUploadId);

  const account = fileUpload?.account;

  const updateAccount = useUpdateAccount();
  const processFileUpload = useProcessFileUpload();

  const headers: string[] = fileUpload?.headers ? JSON.parse(fileUpload.headers) : [];

  async function handleSave(schema: FileUploadSchema) {
    if (!account) throw new Error("Account not loaded.");

    await updateAccount.mutateAsync({
      id: account.id,
      data: { file_upload_schema: schema },
    });

    await processFileUpload.mutateAsync(fileUploadId);

    router.push(`/admin/file-uploads/${fileUploadId}`);
  }

  if (isLoading) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  }

  if (fileUploadError || !fileUpload) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">Failed to load file upload.</p>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Column Mapping Wizard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          File: <span className="font-medium text-gray-700 dark:text-gray-300">{fileUpload.filename}</span>
          {account && (
            <>
              {" · "}Account:{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">{account.name}</span>
            </>
          )}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          This account hasn&apos;t been configured for CSV uploads yet. Map your CSV columns to
          the transaction fields below. This configuration will be saved and reused for all
          future uploads to this account.
        </p>
      </div>

      {headers.length === 0 ? (
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          No headers found in the uploaded file.
        </p>
      ) : (
        <SchemaWizardForm headers={headers} accountType={account?.type} onSave={handleSave} />
      )}
    </div>
  );
}
