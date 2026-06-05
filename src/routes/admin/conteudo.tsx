import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Save, Loader2, Check, Layout, Tag, Type, Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/admin/conteudo')({
  component: AdminConteudo,
});

function AdminConteudo() {
  const { config: initialConfig } = useSiteConfig();
  const [config, setConfig] = useState<any>({});
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialConfig) setConfig(initialConfig);
  }, [initialConfig]);

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Layout },
    { id: 'oferta', label: 'Oferta', icon: Tag },
    { id: 'marquee', label: 'Marquee', icon: Type },
    { id: 'agendamento', label: 'Agendamento', icon: Calendar },
    { id: 'horarios', label: 'Horários', icon: Clock },
  ];

  const handleSave = async (keys: string[]) => {
    setLoading(true);
    setSuccess(false);
    try {
      const updates = keys.map(key => ({
        chave: key,
        valor: config[key] || ''
      }));

      const { error } = await supabase.from('site_config').upsert(updates);
      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Erro ao salvar conteúdo.');
    } finally {
      setLoading(false);
    }
  };

  const Input = ({ label, id, placeholder }: any) => (
    <div className="space-y-2">
      <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">{label}</label>
      <input
        type="text"
        value={config[id] || ''}
        onChange={e => setConfig({ ...config, [id]: e.target.value })}
        className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#AAFF00] outline-none transition-all placeholder-[#444]"
        placeholder={placeholder}
      />
    </div>
  );

  const Textarea = ({ label, id, placeholder }: any) => (
    <div className="space-y-2">
      <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">{label}</label>
      <textarea
        value={config[id] || ''}
        onChange={e => setConfig({ ...config, [id]: e.target.value })}
        className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#AAFF00] outline-none transition-all placeholder-[#444] min-h-[100px] resize-none"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-bebas text-[36px] text-white leading-none mb-1">CONTEÚDO DA LANDING PAGE</h2>
          <p className="font-inter text-sm text-[#444]">Edite os textos sem precisar de programador.</p>
        </div>
        
        {success && (
          <div className="flex items-center gap-2 text-[#AAFF00] font-inter text-sm bg-[#AAFF00]/10 px-6 py-3 rounded-full border border-[#AAFF00]/20 animate-fade-in">
            <Check className="w-4 h-4" /> Salvo com sucesso!
          </div>
        )}
      </div>

      <div className="flex bg-[#111] border border-white/5 p-1 rounded-full w-fit overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === tab.id ? "bg-[#AAFF00] text-[#0A0A0A]" : "text-[#555] hover:text-white"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#111] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl">
        {activeTab === 'hero' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Título Principal (HTML)" id="hero_titulo" />
              <Input label="Subtítulo" id="hero_subtitulo" />
              <Input label="Texto do Botão CTA" id="hero_cta" />
            </div>
            <button onClick={() => handleSave(['hero_titulo', 'hero_subtitulo', 'hero_cta'])} disabled={loading} className="bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] px-10 py-4 rounded-full flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> SALVAR ABA HERO</>}
            </button>
          </div>
        )}

        {activeTab === 'oferta' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Badge da Oferta" id="oferta_badge" />
              <Input label="Título da Oferta" id="oferta_titulo" />
              <Input label="Preço Atual" id="oferta_preco" />
              <Input label="Preço Riscado" id="oferta_preco_riscado" />
            </div>
            <Textarea label="Descrição da Oferta" id="oferta_descricao" />
            <button onClick={() => handleSave(['oferta_badge', 'oferta_titulo', 'oferta_preco', 'oferta_preco_riscado', 'oferta_descricao'])} disabled={loading} className="bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] px-10 py-4 rounded-full flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> SALVAR ABA OFERTA</>}
            </button>
          </div>
        )}

        {activeTab === 'marquee' && (
          <div className="space-y-8 animate-fade-in">
            <Input label="Faixa 1 (Verde)" id="marquee_linha1" />
            <Input label="Faixa 2 (Escura)" id="marquee_linha2" />
            <p className="text-[11px] text-[#444] font-inter italic">Dica: Separe os itens com • para melhor visualização.</p>
            <button onClick={() => handleSave(['marquee_linha1', 'marquee_linha2'])} disabled={loading} className="bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] px-10 py-4 rounded-full flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> SALVAR ABA MARQUEE</>}
            </button>
          </div>
        )}

        {activeTab === 'agendamento' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Título do Agendamento" id="agendamento_titulo" />
              <Input label="Subtítulo do Agendamento" id="agendamento_subtitulo" />
            </div>
            <button onClick={() => handleSave(['agendamento_titulo', 'agendamento_subtitulo'])} disabled={loading} className="bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] px-10 py-4 rounded-full flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> SALVAR ABA AGENDAMENTO</>}
            </button>
          </div>
        )}

        {activeTab === 'horarios' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Segunda a Sexta" id="horario_semana" />
              <Input label="Sábado" id="horario_sabado" />
              <Input label="Feriados" id="horario_feriado" />
              <Input label="Endereço Completo" id="endereco" />
            </div>
            <button onClick={() => handleSave(['horario_semana', 'horario_sabado', 'horario_feriado', 'endereco'])} disabled={loading} className="bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] px-10 py-4 rounded-full flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> SALVAR ABA HORÁRIOS</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
