import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Bug, Database, Globe, User, Activity, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/admin/debug' as any)({
  component: AdminDebug,
});

function AdminDebug() {
  const { config } = useSiteConfig();
  const [utms, setUtms] = useState<any>(null);
  const [conversoes, setConversoes] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. UTMs from sessionStorage
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem('elite_utms');
        setUtms(saved ? JSON.parse(saved) : 'Nenhum UTM capturado');
      }

      // 2. Last 5 conversions
      const { data: convs } = await supabase
        .from('conversoes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setConversoes(convs || []);

      // 3. Last 5 leads
      const { data: leadData } = await supabase
        .from('leads')
        .select('nome, whatsapp, utm_source, utm_medium, utm_campaign, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      setLeads(leadData || []);

    } catch (error) {
      console.error('Debug fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DebugCard = ({ title, icon: Icon, children }: any) => (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3 text-[#d7f803]">
        <Icon className="w-5 h-5" />
        <h3 className="font-bebas text-xl tracking-wider uppercase">{title}</h3>
      </div>
      <div className="font-mono text-xs overflow-auto max-h-[300px]">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
            <Bug className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bebas text-3xl text-white leading-none mb-1">PAINEL DE DEBUG TEMPORÁRIO</h2>
            <p className="text-[#444] text-[10px] font-bold uppercase tracking-widest">Apenas para homologação de pixels e UTMs</p>
          </div>
        </div>
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="p-3 bg-white/5 border border-white/5 rounded-full text-[#555] hover:text-[#d7f803] hover:bg-white/10 transition-all active:scale-95"
        >
          <RefreshCcw className={cn("w-5 h-5", loading && "animate-spin")} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. UTMs */}
        <DebugCard title="SessionStorage UTMs" icon={Globe}>
          <pre className="bg-black/50 p-4 rounded-xl text-blue-400">
            {JSON.stringify(utms, null, 2)}
          </pre>
        </DebugCard>

        {/* 4. Pixel Status */}
        <DebugCard title="Configuração de Pixels" icon={Activity}>
          <div className="space-y-3 p-4 bg-black/50 rounded-xl">
            <p className="flex justify-between">
              <span className="text-[#555]">Pixel Ativo:</span>
              <span className={cn(config.pixel_ativo === 'true' ? "text-[#d7f803]" : "text-red-500")}>
                {config.pixel_ativo || 'false'}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#555]">Meta Pixel ID:</span>
              <span className={config.meta_pixel_id ? "text-white" : "text-[#333]"}>
                {config.meta_pixel_id || 'Vazio'}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#555]">Google Tag ID:</span>
              <span className={config.google_tag_id ? "text-white" : "text-[#333]"}>
                {config.google_tag_id || 'Vazio'}
              </span>
            </p>
          </div>
        </DebugCard>

        {/* 2. Last Conversions */}
        <DebugCard title="Últimas 5 Conversões" icon={Database}>
          <div className="space-y-2">
            {conversoes.map((c, i) => (
              <div key={i} className="p-3 bg-black/50 rounded-lg border border-white/5">
                <p className="text-[#d7f803] font-bold mb-1">{c.tipo}</p>
                <p className="text-[10px] text-[#555]">Source: {c.utm_source || '-'}</p>
                <p className="text-[10px] text-[#555]">{new Date(c.created_at).toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>
        </DebugCard>

        {/* 3. Last Leads */}
        <DebugCard title="Últimos 5 Leads (UTMs)" icon={User}>
          <div className="space-y-2">
            {leads.map((l, i) => (
              <div key={i} className="p-3 bg-black/50 rounded-lg border border-white/5">
                <p className="text-white font-bold mb-1">{l.nome}</p>
                <div className="grid grid-cols-2 gap-2 text-[9px] uppercase tracking-tighter">
                  <span className="text-[#444]">Source: <span className="text-[#888]">{l.utm_source || '-'}</span></span>
                  <span className="text-[#444]">Camp: <span className="text-[#888]">{l.utm_campaign || '-'}</span></span>
                </div>
              </div>
            ))}
          </div>
        </DebugCard>
      </div>
    </div>
  );
}
