import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Check, X, Footprints, MessageCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/admin/agendamentos' as any)({
  component: AdminAgendamentos,
});

function AdminAgendamentos() {
  const { config } = useSiteConfig();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [confirmModal, setConfirmModal] = useState<any>(null);

  useEffect(() => {
    fetchAgendamentos();
  }, [statusFilter]);

  async function fetchAgendamentos() {
    setLoading(true);
    let query = supabase.from('agendamentos').select('*');
    if (statusFilter !== 'todos') query = query.eq('status', statusFilter);
    
    const { data } = await query.order('data_preferida', { ascending: false });
    setAgendamentos(data || []);
    setLoading(false);
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('agendamentos').update({ status }).eq('id', id);
    if (status === 'compareceu') {
      await supabase.from('conversoes').insert([{ tipo: 'visita_realizada' }]);
    }
    setAgendamentos(agendamentos.map(a => a.id === id ? { ...a, status } : a));
    
    if (status === 'confirmado') {
      const app = agendamentos.find(a => a.id === id);
      setConfirmModal(app);
    }
  };

  const sendWhatsAppConfirmation = (app: any) => {
    let msg = config.agendamento_whatsapp_confirmacao || "Olá {nome}! Sua visita está confirmada para {data} às {horario}.";
    msg = msg.replace('{nome}', app.nome)
             .replace('{data}', new Date(app.data_preferida).toLocaleDateString('pt-BR'))
             .replace('{horario}', app.horario_preferido);
    
    const url = `https://wa.me/${app.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setConfirmModal(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="font-bebas text-[36px] text-white leading-none">AGENDAMENTOS</h2>
        
        <div className="flex bg-[#111] border border-white/5 p-1 rounded-full">
          {['todos', 'pendente', 'confirmado', 'cancelado', 'compareceu'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                statusFilter === s ? "bg-[#d7f803] text-[#0A0A0A]" : "text-[#555] hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Visitante</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Data / Horário</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Objetivo</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider text-center">Status</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center"><div className="w-8 h-8 border-2 border-[#d7f803] border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
              ) : agendamentos.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center text-[#444] font-inter text-sm">Nenhum agendamento encontrado.</td></tr>
              ) : (
                agendamentos.map((app) => (
                  <tr key={app.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="p-6">
                      <p className="font-inter text-sm text-white font-bold mb-1">{app.nome}</p>
                      <a href={`https://wa.me/${app.whatsapp}`} className="font-inter text-xs text-[#555] hover:text-[#d7f803]">{app.whatsapp}</a>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-white font-inter text-sm mb-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#d7f803]" />
                        {new Date(app.data_preferida).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-2 text-[#555] font-inter text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {app.horario_preferido}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-inter text-xs text-[#666] mb-1">{app.objetivo}</p>
                      <p className="font-inter text-[10px] text-[#444] uppercase tracking-widest">{app.onde_treina_hoje}</p>
                    </td>
                    <td className="p-6 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        app.status === 'pendente' ? "bg-[#FFB800]/10 text-[#FFB800]" : 
                        app.status === 'confirmado' ? "bg-[#d7f803]/10 text-[#d7f803]" : 
                        app.status === 'compareceu' ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => updateStatus(app.id, 'confirmado')} className="p-2 bg-white/5 border border-white/5 rounded-lg text-[#d7f803] hover:bg-[#d7f803] hover:text-[#0A0A0A] transition-all" title="Confirmar">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(app.id, 'compareceu')} className="p-2 bg-white/5 border border-white/5 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition-all" title="Compareceu">
                          <Footprints className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(app.id, 'cancelado')} className="p-2 bg-white/5 border border-white/5 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Cancelar">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-[#111] border border-[#d7f803]/20 rounded-[32px] p-10 max-w-[440px] w-full text-center shadow-[0_0_100px_rgba(215,248,3,0.1)]">
            <div className="w-20 h-20 bg-[#d7f803] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(215,248,3,0.3)]">
              <MessageCircle className="w-10 h-10 text-[#0A0A0A] fill-current" />
            </div>
            <h3 className="font-bebas text-3xl text-white mb-4 uppercase">VISITA CONFIRMADA!</h3>
            <p className="font-inter text-sm text-[#666] leading-relaxed mb-8">
              O status foi atualizado. Deseja enviar a mensagem de confirmação para <span className="text-white font-bold">{confirmModal.nome}</span> no WhatsApp?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => sendWhatsAppConfirmation(confirmModal)}
                className="w-full bg-[#25D366] text-white font-black uppercase tracking-[1px] py-5 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" /> ENVIAR NO WHATSAPP
              </button>
              <button 
                onClick={() => setConfirmModal(null)}
                className="w-full py-4 text-[#444] font-bold text-xs uppercase tracking-widest hover:text-white transition-all"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
