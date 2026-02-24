"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  label: string;
  exact?: boolean;
}

export default function SidebarLink({ href, label, exact = false }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded text-sm mb-1 transition-colors ${
        isActive
          ? "bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
