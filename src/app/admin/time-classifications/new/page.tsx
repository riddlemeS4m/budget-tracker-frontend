"use client";

import { useRouter } from "next/navigation";
import { useCreateTimeClassification } from "@/lib/hooks";
import TimeClassificationForm from "@/components/admin/time-classifications/TimeClassificationForm";
import type { TimeClassification } from "@/lib/api";

export default function NewTimeClassificationPage() {
  const router = useRouter();
  const createTimeClassification = useCreateTimeClassification();

  async function handleSubmit(data: Pick<TimeClassification, "name">) {
    await createTimeClassification.mutateAsync(data as TimeClassification);
    router.push("/admin/time-classifications");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Time Classification</h1>
      <TimeClassificationForm onSubmit={handleSubmit} />
    </div>
  );
}
