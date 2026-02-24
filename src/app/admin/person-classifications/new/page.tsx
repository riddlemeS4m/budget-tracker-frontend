"use client";

import { useRouter } from "next/navigation";
import { useCreatePersonClassification } from "@/lib/hooks";
import PersonClassificationForm from "@/components/admin/person-classifications/PersonClassificationForm";
import type { PersonClassification } from "@/lib/api";

export default function NewPersonClassificationPage() {
  const router = useRouter();
  const createPersonClassification = useCreatePersonClassification();

  async function handleSubmit(data: Pick<PersonClassification, "name">) {
    await createPersonClassification.mutateAsync(data as PersonClassification);
    router.push("/admin/person-classifications");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Person Classification</h1>
      <PersonClassificationForm onSubmit={handleSubmit} />
    </div>
  );
}
