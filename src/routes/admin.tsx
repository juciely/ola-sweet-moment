import { Outlet, createFileRoute, redirect, useLocation } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLogin } from '@/components/admin/AdminLogin';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      
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
    } catch (err) {
      // If it's a redirect, rethrow it
      if (err && typeof err === 'object' && ('to' in err || 'href' in err || 'isRedirect' in err || 'isNotFound' in err)) {
        throw err;
      }
      console.error('Error in admin beforeLoad:', err);
      // Fallback for catastrophic failure: let the route handle it or rethrow a clean error
      throw err;
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
