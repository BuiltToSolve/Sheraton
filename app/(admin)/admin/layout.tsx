import type { Metadata } from "next";
import { Sidebar } from "@/components/admin-layout/sidebar";
import { Topbar } from "@/components/admin-layout/topbar";
import { SidebarProvider } from "@/components/admin-layout/sidebar-provider";

export const metadata: Metadata = {
  title: "Luxe Hotel Management",
  description: "Modern full-fledged hotel management system",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
