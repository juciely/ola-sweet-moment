import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Type, 
  LogOut,
  Menu,
  X,
  Bug
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'Leads', icon: Users, href: '/admin/leads' },
    { label: 'Agendamentos', icon: Calendar, href: '/admin/agendamentos' },
    { label: 'Conversões', icon: TrendingUp, href: '/admin/conversoes' },
    { label: 'Configurações', icon: Settings, href: '/admin/configuracoes' },
    { label: 'Conteúdo', icon: Type, href: '/admin/conteudo' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/admin' });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0A0A0A] border-r border-white/5">
      <div className="p-8">
        <img src="/logo.png" alt="Elite+" className="w-32 mb-2" />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href as any}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-xl transition-all group",
                isActive 
                  ? "bg-[#161616] text-[#AAFF00] border-l-4 border-[#AAFF00]" 
                  : "text-[#666] hover:text-white hover:bg-white/5"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-[#AAFF00]" : "text-inherit")} />
              <span className="font-inter font-bold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-4 text-[#666] hover:text-[#FF4444] transition-all rounded-xl hover:bg-red-500/5"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-inter font-bold text-sm">Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-[240px] hidden lg:block z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 z-50">
        <img src="/logo.png" alt="Elite+" className="h-8" />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[51] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-[280px] bg-[#0A0A0A] z-[52] lg:hidden transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[240px] pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
