import Link from "next/link";

const sections = [
  {
    heading: "Core",
    items: [
      { href: "/admin/accounts", label: "Accounts", description: "Manage bank and financial accounts." },
      { href: "/admin/file-uploads", label: "File Uploads", description: "Upload and manage transaction source files." },
      { href: "/admin/statements", label: "Statements", description: "View and manage account statements." },
      { href: "/admin/transactions", label: "Transactions", description: "Browse and classify individual transactions." },
    ],
  },
  {
    heading: "Classifications",
    items: [
      { href: "/admin/location-classifications", label: "Location Classes", description: "Top-level location groupings." },
      { href: "/admin/location-subclassifications", label: "Location Subclasses", description: "Granular location breakdowns." },
      { href: "/admin/person-classifications", label: "Person Classes", description: "Classify transactions by person." },
      { href: "/admin/time-classifications", label: "Time Classes", description: "Classify transactions by time period." },
    ],
  },
];

export default function AdminHomePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-1">Admin</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Select a section below to get started.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              {section.heading}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 group"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-48 shrink-0">
                      {item.label}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
