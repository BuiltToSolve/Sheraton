import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { LaunchScreen } from '@/components/launch-screen';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-body relative">
      <LaunchScreen />
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
