import { Outlet, createFileRoute, redirect, useLocation } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLogin } from '@/components/admin/AdminLogin';

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    // Debugging 500 error - minimizing logic
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
