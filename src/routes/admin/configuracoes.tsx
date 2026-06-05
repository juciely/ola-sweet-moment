import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Check, Save, Smartphone, Globe, Megaphone, Loader2, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/admin/configuracoes')({
  component: AdminConfiguracoes,
});

function AdminConfiguracoes() {
  const { config: initialConfig } = useSiteConfig();
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (initialConfig) setConfig(initialConfig);
  }, [initialConfig]);

  const handleSave = async (keys: string[]) => {
    setLoading(true);
    setSuccess(null);
    try {
      const updates = keys.map(key => ({
        chave: key,
        valor: config[key] || ''
      }));

      const { error } = await supabase.from('site_config').upsert(updates);
      if (error) throw error;
      
      setSuccess('Configurações salvas com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving config:', err);
      alert('Erro ao salvar configurações.');
    } finally {
      setLoading(false);
    }
  };

  const ConfigCard = ({ title, icon: Icon, children, keys }: any) => (
    <div className="bg-[#111] border border-white/5 rounded-[24px] p-8 space-y-8 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="bg-[#d7f803]/10 p-3 rounded-xl text-[#d7f803]">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bebas text-2xl text-white uppercase">{title}</h3>
      </div>

      <div className="space-y-6 flex-1">
        {children}
      </div>

      <button
        onClick={() => handleSave(keys)}
        disabled={loading}
        className="w-full bg-[#d7f803] text-[#0A0A0A] font-black uppercase tracking-[1px] py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> SALVAR</>}
      </button>
    </div>
  );

  const Input = ({ label, id, type = "text", note }: any) => (
    <div className="space-y-2">
      <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">{label}</label>
      <input
        type={type}
        value={config[id] || ''}
        onChange={e => setConfig({ ...config, [id]: e.target.value })}
        className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#d7f803] outline-none transition-all placeholder-[#444]"
      />
      {note && <p className="text-[10px] text-[#444] leading-relaxed">{note}</p>}
    </div>
  );

  const Textarea = ({ label, id, note }: any) => (
    <div className="space-y-2">
      <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">{label}</label>
      <textarea
        value={config[id] || ''}
        onChange={e => setConfig({ ...config, [id]: e.target.value })}
        className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#d7f803] outline-none transition-all placeholder-[#444] min-h-[100px] resize-none"
      />
      {note && <p className="text-[10px] text-[#444] leading-relaxed">{note}</p>}
    </div>
  );

  const Toggle = ({ label, id }: any) => (
    <div className="flex items-center justify-between p-5 bg-[#161616] rounded-xl border border-[#222]">
      <label className="text-[11px] text-[#666] font-bold uppercase tracking-[1px]">{label}</label>
      <button
        onClick={() => setConfig({ ...config, [id]: config[id] === 'true' ? 'false' : 'true' })}
        className={cn(
          "w-12 h-6 rounded-full relative transition-all duration-300",
          config[id] === 'true' ? "bg-[#d7f803]" : "bg-[#333]"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
          config[id] === 'true' ? "left-7" : "left-1"
        )} />
      </button>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in relative pb-20">
      <div className="flex items-center justify-between">
        <h2 className="font-bebas text-[36px] text-white leading-none">CONFIGURAÇÕES</h2>
        {success && (
          <div className="flex items-center gap-2 text-[#d7f803] font-inter text-sm bg-[#d7f803]/10 px-6 py-3 rounded-full border border-[#d7f803]/20 animate-fade-in">
            <Check className="w-4 h-4" /> {success}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <ConfigCard title="Pixels e Rastreamento" icon={Globe} keys={['meta_pixel_id', 'google_tag_id', 'pixel_ativo']}>
          <Input label="Meta Pixel ID" id="meta_pixel_id" />
          <Input label="Google Tag ID (G-XXXXX)" id="google_tag_id" />
          <Toggle label="Pixel Ativo" id="pixel_ativo" />
          <p className="text-[11px] text-[#444] bg-[#0A0A0A] p-4 rounded-lg border border-white/5">
            Após salvar, recarregue a página da LP para que os scripts sejam ativados corretamente.
          </p>
        </ConfigCard>

        <ConfigCard title="WhatsApp" icon={Smartphone} keys={['whatsapp_numero', 'whatsapp_mensagem', 'agendamento_whatsapp_confirmacao']}>
          <Input label="Número (com DDD e DDI)" id="whatsapp_numero" note="Ex: 5566999970103" />
          <Textarea label="Mensagem Padrão CTA" id="whatsapp_mensagem" />
          <Textarea 
            label="Mensagem de Confirmação" 
            id="agendamento_whatsapp_confirmacao" 
            note="Variáveis disponíveis: {nome}, {data}, {horario}"
          />
        </ConfigCard>

        <ConfigCard title="Anúncios e Campanhas" icon={Megaphone} keys={['agendamento_ativo']}>
          <Toggle label="Agendamento Ativo" id="agendamento_ativo" />
          <div className="space-y-4">
            <p className="text-[11px] text-[#555] leading-relaxed">
              Use os pixels acima para configurar suas campanhas. As UTMs são capturadas automaticamente em qualquer link da Landing Page.
            </p>
            <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-xl space-y-2">
              <p className="text-[9px] text-[#444] font-black uppercase tracking-widest">Exemplo de URL de Anúncio</p>
              <code className="text-[10px] text-[#d7f803] break-all block">
                https://lp.eliteperformance.com.br?utm_source=meta&utm_medium=cpc&utm_campaign=reinauguracao
              </code>
            </div>
          </div>
        </ConfigCard>
      </div>
    </div>
  );
}
