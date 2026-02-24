"use client";

import { useRouter } from "next/navigation";
import { useCreateLocationClassification } from "@/lib/hooks";
import LocationClassificationForm from "@/components/admin/location-classifications/LocationClassificationForm";
import type { LocationClassification } from "@/lib/api";

export default function NewLocationClassificationPage() {
  const router = useRouter();
  const createLocationClassification = useCreateLocationClassification();

  async function handleSubmit(
    data: Pick<LocationClassification, "name" | "type">
  ) {
    await createLocationClassification.mutateAsync(
      data as LocationClassification
    );
    router.push("/admin/location-classifications");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        New Location Classification
      </h1>
      <LocationClassificationForm onSubmit={handleSubmit} />
    </div>
  );
}
