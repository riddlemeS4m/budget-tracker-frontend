import CsvUploadForm from "@/components/admin/file-uploads/CsvUploadForm";

export default function NewFileUploadPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Upload CSV</h1>
      <CsvUploadForm />
    </div>
  );
}
