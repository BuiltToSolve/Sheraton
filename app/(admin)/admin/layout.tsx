import type { Metadata } from "next";
import { Sidebar } from "@/components/admin-layout/sidebar";
import { Topbar } from "@/components/admin-layout/topbar";
import { SidebarProvider } from "@/components/admin-layout/sidebar-provider";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Samrat Sheraton",
  description: "Modern full-fledged hotel management system",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const adminRoles = ['SUPERADMIN', 'ADMIN'];
  
  if (!user || !adminRoles.includes(user.role)) {
    redirect('/');
  }

  return (
    <div className="admin-layout dark">
      <SidebarProvider>
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
