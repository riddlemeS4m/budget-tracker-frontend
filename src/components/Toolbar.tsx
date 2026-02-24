import ToolbarLink from "./ToolbarLink";

const apps = [
  { href: "/admin", label: "Admin" },
];

export default function Toolbar() {
  return (
    <nav className="shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2 flex items-center gap-1">
      {apps.map((app) => (
        <ToolbarLink key={app.href} href={app.href} label={app.label} />
      ))}
    </nav>
  );
}
