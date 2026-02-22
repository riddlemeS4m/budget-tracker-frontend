import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
