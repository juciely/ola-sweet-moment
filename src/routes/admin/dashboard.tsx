import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const Route = createFileRoute('/admin/dashboard' as any)({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    agendamentos: 0,
    cliques: 0,
    matriculas: 0
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Stats
        const [
          { count: leadsCount },
          { count: appointmentsCount },
          { count: clicksCount },
          { count: salesCount }
        ] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('agendamentos').select('*', { count: 'exact', head: true }).eq('status', 'pendente'),
          supabase.from('conversoes').select('*', { count: 'exact', head: true }).eq('tipo', 'clique_whatsapp'),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('converteu_matricula', true)
        ]);

        setStats({
          leads: leadsCount || 0,
          agendamentos: appointmentsCount || 0,
          cliques: clicksCount || 0,
          matriculas: salesCount || 0
        });

        // Recent Leads
        const { data: leads } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        setRecentLeads(leads || []);

        // Today's Appointments
        const today = new Date().toISOString().split('T')[0];
        const { data: appointments } = await supabase
          .from('agendamentos')
          .select('*')
          .eq('data_preferida', today)
          .order('horario_preferido', { ascending: true });
        setTodayAppointments(appointments || []);

        // Chart Data (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: leadsHistory } = await supabase
          .from('leads')
          .select('created_at')
          .gte('created_at', thirtyDaysAgo.toISOString());

        const historyMap: Record<string, number> = {};
        leadsHistory?.forEach(lead => {
          const date = new Date(lead.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          historyMap[date] = (historyMap[date] || 0) + 1;
        });

        const formattedChartData = Object.entries(historyMap).map(([date, count]) => ({
          date,
          leads: count
        })).sort((a, b) => {
          const [dayA, monthA] = a.date.split('/');
          const [dayB, monthB] = b.date.split('/');
          return new Date(2026, parseInt(monthA)-1, parseInt(dayA)).getTime() - new Date(2026, parseInt(monthB)-1, parseInt(dayB)).getTime();
        });

        setChartData(formattedChartData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return null;

  const MetricCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-[#111] border border-white/5 p-6 rounded-[24px] relative overflow-hidden group">
      <div className={cn("absolute top-6 right-6 p-2 rounded-xl bg-white/5 transition-colors group-hover:bg-opacity-20", `text-[${color}]`)}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <p className="font-inter text-[11px] text-[#555] font-black uppercase tracking-[2px] mb-2">{title}</p>
      <h3 className="font-bebas text-[48px] leading-none text-white">{value}</h3>
      <div className="absolute bottom-0 left-0 h-1 transition-all group-hover:w-full" style={{ backgroundColor: color, width: '20%' }}></div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="font-bebas text-[36px] text-white leading-none mb-1">VISÃO GERAL</h2>
        <p className="font-inter text-sm text-[#444]">{new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' })}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total de Leads" value={stats.leads} icon={Users} color="#d7f803" />
        <MetricCard title="Agendamentos Pendentes" value={stats.agendamentos} icon={Calendar} color="#FFB800" />
        <MetricCard title="Cliques no WhatsApp" value={stats.cliques} icon={MessageCircle} color="#25D366" />
        <MetricCard title="Matrículas Confirmadas" value={stats.matriculas} icon={CheckCircle} color="#d7f803" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-[#111] border border-white/5 rounded-[24px] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bebas text-2xl text-white">ÚLTIMOS 10 LEADS</h3>
            <Link to="/admin/leads" className="text-[#d7f803] text-xs font-bold flex items-center gap-1 hover:underline">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 font-inter text-[11px] text-[#555] uppercase tracking-wider">Nome</th>
                  <th className="pb-4 font-inter text-[11px] text-[#555] uppercase tracking-wider">Plano</th>
                  <th className="pb-4 font-inter text-[11px] text-[#555] uppercase tracking-wider text-right">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02]">
                    <td className="py-4 font-inter text-sm text-white font-medium">{lead.nome}</td>
                    <td className="py-4 font-inter text-xs text-[#888]">{lead.plano_interesse}</td>
                    <td className="py-4 font-inter text-xs text-[#555] text-right">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-[#111] border border-white/5 rounded-[24px] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bebas text-2xl text-white">AGENDAMENTOS DE HOJE</h3>
            <Link to="/admin/agendamentos" className="text-[#d7f803] text-xs font-bold flex items-center gap-1 hover:underline">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {todayAppointments.length === 0 ? (
              <p className="text-[#444] text-sm text-center py-10">Nenhum agendamento para hoje.</p>
            ) : (
              todayAppointments.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="font-inter text-sm text-white font-bold">{app.nome}</p>
                    <p className="font-inter text-[11px] text-[#555] uppercase tracking-wider">{app.horario_preferido}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    app.status === 'pendente' ? "bg-[#FFB800]/10 text-[#FFB800]" : 
                    app.status === 'confirmado' ? "bg-[#d7f803]/10 text-[#d7f803]" : "bg-red-500/10 text-red-500"
                  )}>
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Leads Chart */}
      <div className="bg-[#111] border border-white/5 rounded-[24px] p-8">
        <h3 className="font-bebas text-2xl text-white mb-8">LEADS POR DIA — ÚLTIMOS 30 DIAS</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#444" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#444" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                itemStyle={{ color: '#d7f803', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#d7f803" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#d7f803', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
