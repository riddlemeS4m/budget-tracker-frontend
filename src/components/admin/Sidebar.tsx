import SidebarLink from "./SidebarLink";

const coreNavItems = [
  { href: "/admin/accounts", label: "Accounts" },
  { href: "/admin/file-uploads", label: "File Uploads" },
  { href: "/admin/statements", label: "Statements" },
  { href: "/admin/transactions", label: "Transactions" },
];

const classificationNavItems = [
  { href: "/admin/location-classifications", label: "Location Classes" },
  { href: "/admin/location-subclassifications", label: "Location Subclasses" },
  { href: "/admin/person-classifications", label: "Person Classes" },
  { href: "/admin/time-classifications", label: "Time Classes" },
];

export default function Sidebar() {
  return (
    <nav className="w-48 shrink-0 border-r border-gray-200 dark:border-gray-700 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">
        Data Management
      </p>
      <ul>
        {coreNavItems.map((item) => (
          <li key={item.href}>
            <SidebarLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
      <hr className="my-3 border-gray-200 dark:border-gray-700" />
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">
        Classifications
      </p>
      <ul>
        {classificationNavItems.map((item) => (
          <li key={item.href}>
            <SidebarLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
