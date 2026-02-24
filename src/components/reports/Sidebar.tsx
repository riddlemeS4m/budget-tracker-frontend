import SidebarLink from "@/components/admin/SidebarLink";

const navItems = [
  { href: "/reports/exploration", label: "Exploration", exact: true },
  { href: "/reports/audit", label: "Audit", exact: true },
];

export default function Sidebar() {
  return (
    <nav className="w-48 shrink-0 border-r border-gray-200 dark:border-gray-700 p-4">
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <SidebarLink href={item.href} label={item.label} exact={item.exact} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
