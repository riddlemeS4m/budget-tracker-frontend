"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import {
  useLocationSubclassification,
  useUpdateLocationSubclassification,
} from "@/lib/hooks";
import LocationSubclassificationForm from "@/components/admin/location-subclassifications/LocationSubclassificationForm";
import type { LocationSubClassification } from "@/lib/api";

export default function EditLocationSubclassificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lscId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useLocationSubclassification(lscId);
  const updateLocationSubclassification = useUpdateLocationSubclassification();

  async function handleSubmit(
    updates: Pick<
      LocationSubClassification,
      "name" | "location_classification_id"
    >
  ) {
    await updateLocationSubclassification.mutateAsync({
      id: lscId,
      data: updates,
    });
    router.push(`/admin/location-subclassifications/${lscId}`);
  }

  if (isLoading)
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load location subclassification.
      </p>
    );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        Edit Location Subclassification #{data.id}
      </h1>
      <LocationSubclassificationForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/location-subclassifications/${lscId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Location Subclassification
        </Link>
      </div>
    </div>
  );
}
