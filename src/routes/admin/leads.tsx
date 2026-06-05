import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Download, Check, X, Filter } from 'lucide-react';

export const Route = createFileRoute('/admin/leads')({
  component: AdminLeads,
});

function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [planoFilter, setPlanoFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchLeads();
  }, [search, planoFilter, page]);

  async function fetchLeads() {
    setLoading(true);
    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`nome.ilike.%${search}%,whatsapp.ilike.%${search}%`);
    }

    if (planoFilter) {
      query = query.eq('plano_interesse', planoFilter);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) console.error('Error fetching leads:', error);
    else setLeads(data || []);
    setLoading(false);
  }

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ['Nome', 'WhatsApp', 'Plano', 'UTM Source', 'UTM Campaign', 'WhatsApp Clicado', 'Matrícula', 'Data'];
    const csvData = leads.map(l => [
      l.nome,
      l.whatsapp,
      l.plano_interesse,
      l.utm_source || '',
      l.utm_campaign || '',
      l.converteu_whatsapp ? 'Sim' : 'Não',
      l.converteu_matricula ? 'Sim' : 'Não',
      new Date(l.created_at).toLocaleString('pt-BR')
    ]);

    const csvContent = [headers, ...csvData].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_elite_performance_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const toggleMatricula = async (leadId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await supabase.from('leads').update({ converteu_matricula: newStatus }).eq('id', leadId);
      
      if (newStatus) {
        await supabase.from('conversoes').insert([{
          tipo: 'matricula_confirmada',
          lead_id: leadId
        }]);
      }
      
      setLeads(leads.map(l => l.id === leadId ? { ...l, converteu_matricula: newStatus } : l));
    } catch (error) {
      console.error('Error updating matricula:', error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="font-bebas text-[36px] text-white leading-none">LEADS</h2>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444] group-focus-within:text-[#d7f803] transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar nome ou zap..."
              className="bg-[#111] border border-white/5 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:border-[#d7f803] outline-none w-[260px] transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4" /> EXPORTAR CSV
          </button>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Nome</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Contato</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider">Plano</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider text-center">Status</th>
                <th className="p-6 font-inter text-[11px] text-[#555] uppercase tracking-wider text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center"><div className="w-8 h-8 border-2 border-[#d7f803] border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center text-[#444] font-inter text-sm">Nenhum lead encontrado.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="p-6">
                      <p className="font-inter text-sm text-white font-bold mb-1">{lead.nome}</p>
                      <p className="font-inter text-[10px] text-[#444] uppercase tracking-widest">{lead.utm_source || 'Direto'}</p>
                    </td>
                    <td className="p-6">
                      <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" className="font-inter text-sm text-[#888] hover:text-[#d7f803] transition-colors">{lead.whatsapp}</a>
                    </td>
                    <td className="p-6 font-inter text-xs text-[#666] uppercase">{lead.plano_interesse}</td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-4">
                        <div title="Clicou no WhatsApp" className={`w-8 h-8 rounded-full flex items-center justify-center border ${lead.converteu_whatsapp ? 'bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366]' : 'border-white/5 text-[#222]'}`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <button 
                          onClick={() => toggleMatricula(lead.id, lead.converteu_matricula)}
                          title="Matrícula Confirmada"
                          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${lead.converteu_matricula ? 'bg-[#d7f803] border-[#d7f803] text-[#0A0A0A]' : 'border-white/10 text-[#444] hover:border-white/30'}`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="p-6 text-right font-inter text-xs text-[#444]">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}<br/>
                      <span className="opacity-40">{new Date(lead.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
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
