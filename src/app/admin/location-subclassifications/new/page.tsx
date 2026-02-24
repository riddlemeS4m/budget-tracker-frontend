"use client";

import { useRouter } from "next/navigation";
import { useCreateLocationSubclassification } from "@/lib/hooks";
import LocationSubclassificationForm from "@/components/admin/location-subclassifications/LocationSubclassificationForm";
import type { LocationSubClassification } from "@/lib/api";

export default function NewLocationSubclassificationPage() {
  const router = useRouter();
  const createLocationSubclassification = useCreateLocationSubclassification();

  async function handleSubmit(
    data: Pick<LocationSubClassification, "name" | "location_classification_id">
  ) {
    await createLocationSubclassification.mutateAsync(
      data as LocationSubClassification
    );
    router.push("/admin/location-subclassifications");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        New Location Subclassification
      </h1>
      <LocationSubclassificationForm onSubmit={handleSubmit} />
    </div>
  );
}
