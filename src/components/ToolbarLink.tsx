"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ToolbarLinkProps {
  href: string;
  label: string;
  exact?: boolean;
}

export default function ToolbarLink({ href, label, exact = false }: ToolbarLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded text-sm transition-colors ${
        isActive
          ? "font-semibold text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
