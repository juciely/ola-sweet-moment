import { Outlet, createFileRoute, redirect, useLocation } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLogin } from '@/components/admin/AdminLogin';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Normalize path
    const isLoginPage = location.pathname.replace(/\/$/, '') === '/admin';
    const isRoot = location.pathname === '/';

    // If not logged in and not on login page, redirect to login
    // BUT only if we are inside /admin (isLoginPage is true for /admin or /admin/)
    // and we are NOT on the root page
    if (!session && !isLoginPage && !isRoot) {
      throw redirect({
        to: '/admin',
      });
    }

    // If logged in and on login page, redirect to dashboard
    if (session && isLoginPage) {
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
