import ReportCard from "@/components/reports/ReportCard";

const reports = [
  {
    title: "Cash Flow Statement",
    description:
      "View revenues and expenses grouped by category and subcategory for any custom date range.",
    href: "/reports/exploration/cash-flow-statement",
  },
];

export default function ExplorationIndexPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold mb-1">Exploration</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Ad-hoc reports with flexible date range filtering. Use these to drill into
        specific time periods and answer questions about your finances.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.href} {...report} />
        ))}
      </div>
    </div>
  );
}
