"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useTimeClassification, useUpdateTimeClassification } from "@/lib/hooks";
import TimeClassificationForm from "@/components/admin/time-classifications/TimeClassificationForm";
import type { TimeClassification } from "@/lib/api";

export default function EditTimeClassificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const tcId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useTimeClassification(tcId);
  const updateTimeClassification = useUpdateTimeClassification();

  async function handleSubmit(updates: Pick<TimeClassification, "name">) {
    await updateTimeClassification.mutateAsync({ id: tcId, data: updates });
    router.push(`/admin/time-classifications/${tcId}`);
  }

  if (isLoading)
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load time classification.
      </p>
    );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        Edit Time Classification #{data.id}
      </h1>
      <TimeClassificationForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/time-classifications/${tcId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Time Classification
        </Link>
      </div>
    </div>
  );
}
