import AdminSidebar from "@/components/AdminSidebar";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#F4F8F8] flex flex-col lg:flex-row">
        <AdminSidebar />

        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}