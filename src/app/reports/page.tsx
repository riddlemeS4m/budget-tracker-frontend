const sections = [
  {
    heading: "Spending",
    items: [
      { label: "Monthly Summary", description: "Overview of income and expenses by month." },
      { label: "Category Breakdown", description: "Spending totals grouped by classification." },
      { label: "Trends", description: "Spending patterns and changes over time." },
    ],
  },
  {
    heading: "Accounts",
    items: [
      { label: "Account Balances", description: "Current and historical balances per account." },
      { label: "Statement History", description: "Transaction totals across statements." },
    ],
  },
];

export default function ReportsHomePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-1">Reports</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Reports are coming soon. Below is a preview of what will be available.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              {section.heading}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <div className="flex items-baseline gap-3 px-3 py-2 rounded text-gray-400 dark:text-gray-600">
                    <span className="text-sm font-medium w-48 shrink-0">
                      {item.label}
                    </span>
                    <span className="text-sm">
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
