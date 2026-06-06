import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TrendingUp, Users, Calendar, MessageCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Route = createFileRoute('/admin/conversoes' as any)({
  component: AdminConversoes,
});

function AdminConversoes() {
  const [period, setPeriod] = useState('30');
  const [stats, setStats] = useState({
    leads: 0,
    agendamentos: 0,
    matriculas: 0,
    visitas: 0
  });
  const [conversoes, setConversoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversoes();
  }, [period]);

  async function fetchConversoes() {
    setLoading(true);
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - parseInt(period));

    try {
      const { data: convs } = await supabase
        .from('conversoes')
        .select(`
          *,
          leads (
            nome,
            plano_interesse
          )
        `)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      setConversoes(convs || []);

      // Calculate Funnel
      const leadsCount = convs?.filter(c => c.tipo === 'lead_formulario').length || 0;
      const appCount = convs?.filter(c => c.tipo === 'clique_whatsapp' || c.tipo === 'lead_formulario').length || 0; // Simplified for demo
      const saleCount = convs?.filter(c => c.tipo === 'matricula_confirmada').length || 0;
      const visitCount = convs?.filter(c => c.tipo === 'visita_realizada').length || 0;

      setStats({
        leads: leadsCount,
        agendamentos: appCount,
        matriculas: saleCount,
        visitas: visitCount
      });
    } catch (error) {
      console.error('Error fetching conversions:', error);
    } finally {
      setLoading(false);
    }
  }

  const FunnelBar = ({ label, value, total, color }: any) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-[#555]">{label}</span>
          <span className="text-white">{value} <span className="text-[#444] ml-1">({percentage.toFixed(1)}%)</span></span>
        </div>
        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full transition-all duration-1000" 
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="font-bebas text-[36px] text-white leading-none">CONVERSÕES</h2>
        
        <div className="flex bg-[#111] border border-white/5 p-1 rounded-full">
          {[
            { id: '1', label: 'Hoje' },
            { id: '7', label: '7 dias' },
            { id: '30', label: '30 dias' },
            { id: '9999', label: 'Total' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                period === p.id ? "bg-[#d7f803] text-[#0A0A0A]" : "text-[#555] hover:text-white"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funnel Visual */}
        <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-[24px] p-8 space-y-8">
          <h3 className="font-bebas text-2xl text-white">FUNIL DE VENDAS</h3>
          <div className="space-y-6">
            <FunnelBar label="Leads Gerados" value={stats.leads} total={stats.leads} color="#d7f803" />
            <FunnelBar label="Interessados (WA/Agenda)" value={stats.agendamentos} total={stats.leads} color="#FFB800" />
            <FunnelBar label="Visitas Realizadas" value={stats.visitas} total={stats.leads} color="#25D366" />
            <FunnelBar label="Matrículas" value={stats.matriculas} total={stats.leads} color="#d7f803" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#555] font-black uppercase tracking-widest mb-1">Taxa de Matrícula</p>
              <h4 className="font-bebas text-3xl text-white">
                {stats.leads > 0 ? ((stats.matriculas / stats.leads) * 100).toFixed(1) : 0}%
              </h4>
            </div>
            <div className="bg-[#d7f803]/10 p-3 rounded-xl text-[#d7f803]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#555] font-black uppercase tracking-widest mb-1">Leads por Dia</p>
              <h4 className="font-bebas text-3xl text-white">
                {(stats.leads / (parseInt(period) || 1)).toFixed(1)}
              </h4>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Conversion List */}
      <div className="bg-[#111] border border-white/5 rounded-[24px] overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h3 className="font-bebas text-2xl text-white">HISTÓRICO DE EVENTOS</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Evento</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Lead / Plano</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Origem</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center"><div className="w-8 h-8 border-2 border-[#d7f803] border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
              ) : conversoes.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center text-[#444] font-inter text-sm">Nenhum evento registrado no período.</td></tr>
              ) : (
                conversoes.map((conv) => (
                  <tr key={conv.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="p-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        conv.tipo === 'lead_formulario' ? "bg-blue-500/10 text-blue-500" :
                        conv.tipo === 'clique_whatsapp' ? "bg-[#25D366]/10 text-[#25D366]" :
                        conv.tipo === 'matricula_confirmada' ? "bg-[#d7f803]/10 text-[#d7f803]" : "bg-orange-500/10 text-orange-500"
                      )}>
                        {conv.tipo.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-6">
                      <p className="font-inter text-sm text-white font-bold">{conv.leads?.nome || 'Anônimo'}</p>
                      <p className="font-inter text-[10px] text-[#555] uppercase tracking-widest">{conv.leads?.plano_interesse || conv.valor_plano || '-'}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-inter text-xs text-[#666] uppercase">{conv.utm_source || 'Direto'}</p>
                      <p className="font-inter text-[10px] text-[#444] uppercase tracking-widest">{conv.utm_campaign || '-'}</p>
                    </td>
                    <td className="p-6 text-right font-inter text-xs text-[#444]">
                      {new Date(conv.created_at).toLocaleDateString('pt-BR')}<br/>
                      <span className="opacity-40">{new Date(conv.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
