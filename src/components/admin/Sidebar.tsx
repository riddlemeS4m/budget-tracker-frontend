import SidebarLink from "./SidebarLink";

const navItems = [
  { href: "/admin/accounts", label: "Accounts" },
  { href: "/admin/file-uploads", label: "File Uploads" },
  { href: "/admin/transactions", label: "Transactions" },
];

export default function Sidebar() {
  return (
    <nav className="w-44 shrink-0 border-r border-gray-200 dark:border-gray-700 min-h-screen p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">
        Admin
      </p>
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <SidebarLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
