import { Outlet, createFileRoute, redirect, useLocation } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLogin } from '@/components/admin/AdminLogin';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    // Basic normalization
    const path = location.pathname.replace(/\/$/, '') || '/';
    const isLoginPage = path === '/admin';

    // If logged in and on login page, redirect to dashboard
    // EXCEPT if we are forcing setup via URL search string
    // const isForcingSetup = (location.search as any).setup === 'true' || (location.searchStr || '').toLowerCase().includes('setup=true');
    // REMOVED COMPLEX LOGIC TEMPORARILY TO DEBUG 500
    
    return;
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
