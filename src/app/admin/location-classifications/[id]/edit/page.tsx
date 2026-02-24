"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import {
  useLocationClassification,
  useUpdateLocationClassification,
} from "@/lib/hooks";
import LocationClassificationForm from "@/components/admin/location-classifications/LocationClassificationForm";
import type { LocationClassification } from "@/lib/api";

export default function EditLocationClassificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lcId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useLocationClassification(lcId);
  const updateLocationClassification = useUpdateLocationClassification();

  async function handleSubmit(
    updates: Pick<LocationClassification, "name" | "type">
  ) {
    await updateLocationClassification.mutateAsync({ id: lcId, data: updates });
    router.push(`/admin/location-classifications/${lcId}`);
  }

  if (isLoading)
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load location classification.
      </p>
    );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        Edit Location Classification #{data.id}
      </h1>
      <LocationClassificationForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/location-classifications/${lcId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Location Classification
        </Link>
      </div>
    </div>
  );
}
