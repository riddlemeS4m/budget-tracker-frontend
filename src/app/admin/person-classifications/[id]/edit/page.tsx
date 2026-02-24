"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { usePersonClassification, useUpdatePersonClassification } from "@/lib/hooks";
import PersonClassificationForm from "@/components/admin/person-classifications/PersonClassificationForm";
import type { PersonClassification } from "@/lib/api";

export default function EditPersonClassificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pcId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = usePersonClassification(pcId);
  const updatePersonClassification = useUpdatePersonClassification();

  async function handleSubmit(updates: Pick<PersonClassification, "name">) {
    await updatePersonClassification.mutateAsync({ id: pcId, data: updates });
    router.push(`/admin/person-classifications/${pcId}`);
  }

  if (isLoading)
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load person classification.
      </p>
    );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        Edit Person Classification #{data.id}
      </h1>
      <PersonClassificationForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/person-classifications/${pcId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Person Classification
        </Link>
      </div>
    </div>
  );
}
