import { Outlet, createFileRoute, redirect, useLocation } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLogin } from '@/components/admin/AdminLogin';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Normalize path
    const isLoginPage = location.pathname.replace(/\/$/, '') === '/admin';

    // If not logged in and not on login page, redirect to login
    if (!session && !isLoginPage) {
      throw redirect({
        to: '/admin',
      });
    }

    // If logged in and on login page, redirect to dashboard
    // EXCEPT if we are forcing setup via URL search string
    const isForcingSetup = (location.search as any).setup === 'true' || (location.searchStr || '').toLowerCase().includes('setup=true');
    if (session && isLoginPage && !isForcingSetup) {
      throw redirect({
        to: '/admin/dashboard',
      });
    }
  },
  component: AdminRoot,
});

function AdminRoot() {
  const { pathname } = useLocation();
  
  const isLoginPage = pathname.replace(/\/$/, '') === '/admin';
  
  if (isLoginPage) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

function AdminRoot() {
  const { pathname } = useLocation();
  const isLoginPage = pathname.replace(/\/$/, '') === '/admin';
  
  if (isLoginPage) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
