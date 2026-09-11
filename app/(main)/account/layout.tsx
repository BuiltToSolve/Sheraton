import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import { SidebarNav } from './sidebar-nav';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== 'GUEST') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Navbar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden md:sticky md:top-28">
              <div className="p-6 border-b border-border bg-navy text-white text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-heading">
                  {(user.name || 'G')[0].toUpperCase()}
                </div>
                <h3 className="font-heading text-lg font-bold truncate">
                  {user.name || user.mobile}
                </h3>
                <p className="text-xs text-white/70 mt-1 uppercase tracking-wider">
                  Guest
                </p>
              </div>
              
              <SidebarNav />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
