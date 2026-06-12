import type { ReactNode } from 'react';
import { useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemePanel from './ThemePanel';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  // Admin page has its own layout (no shared navbar/footer)
  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ThemePanel />
      <ScrollToTop />
    </div>
  );
}
