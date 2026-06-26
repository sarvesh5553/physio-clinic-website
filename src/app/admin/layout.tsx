import AdminSidebar from "@/components/AdminSidebar";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#F4F8F8] flex">
        <AdminSidebar />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}