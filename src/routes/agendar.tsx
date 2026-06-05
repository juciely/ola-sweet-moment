import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTracking } from '@/hooks/useTracking';
import { supabase } from '@/lib/supabase';
import { Footer } from '@/components/landing/Footer';
import { DoorOpen, ClipboardList, Dumbbell, CheckCircle2, MessageCircle, MapPin, Calendar, Clock } from 'lucide-react';

export const Route = createFileRoute('/agendar')({
  component: AgendarVisita,
});

function AgendarVisita() {
  const { config, loading: configLoading } = useSiteConfig();
  const { getUtms, trackWhatsappClick } = useTracking();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    data: '',
    horario: '',
    onde_treina: '',
    objetivo: ''
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 30);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const utms = getUtms();
    const dataToInsert = {
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      data_preferida: formData.data,
      horario_preferido: formData.horario,
      onde_treina_hoje: formData.onde_treina,
      objetivo: formData.objetivo,
      ...utms
    };

    try {
      const { error } = await supabase.from('agendamentos').insert([dataToInsert]);
      if (error) throw error;
      
      trackWhatsappClick('agendamento');
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erro ao agendar:', err);
      alert('Ocorreu um erro ao processar seu agendamento. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatWhatsAppLink = () => {
    const dataFmt = formData.data.split('-').reverse().join('/');
    const msg = `Olá! Acabei de agendar minha visita para ${dataFmt} às ${formData.horario}. Meu nome é ${formData.nome}.`;
    const number = config.whatsapp_numero || '5566999970103';
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  };

  if (configLoading) {
    return <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#AAFF00] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <main className="bg-[#080808] text-white min-h-screen font-inter selection:bg-[#AAFF00] selection:text-[#080808]">
      {/* HERO SIMPLES */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#AAFF00]/10 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] md:text-[12px] font-bold uppercase tracking-[3px] px-6 py-2 rounded-full mb-8">
            VISITA GRATUITA E SEM COMPROMISSO
          </div>
          <h1 className="font-bebas text-[52px] md:text-[84px] leading-[1] mb-8 tracking-tighter uppercase">
            VENHA CONHECER A <span className="text-[#AAFF00]">ELITE+ PERFORMANCE</span>
          </h1>
          <p className="text-[#AAAAAA] text-[16px] md:text-[20px] max-w-[700px] mx-auto leading-relaxed mb-12">
            {config.agendamento_subtitulo || 'Venha conhecer a Elite+ Performance sem compromisso. A visita é gratuita e você já sai com seu treino montado.'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-[#AAFF00] font-bold text-[12px] md:text-[14px] uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5" /> Sem taxa
            </div>
            <div className="flex items-center gap-2 text-[#AAFF00] font-bold text-[12px] md:text-[14px] uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5" /> Treino montado na visita
            </div>
            <div className="flex items-center gap-2 text-[#AAFF00] font-bold text-[12px] md:text-[14px] uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5" /> Sai sabendo o plano ideal
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO / SUCESSO */}
      <section className="pb-32 px-6">
        <div className="max-w-[560px] mx-auto bg-[#111111] border border-[#1E1E1E] rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {success ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-24 h-24 bg-[#AAFF00] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-[0_0_50px_rgba(170,255,0,0.4)]">
                <CheckCircle2 className="w-12 h-12 text-[#0A0A0A]" />
              </div>
              <h2 className="font-bebas text-[48px] text-[#AAFF00] mb-4">VISITA CONFIRMADA!</h2>
              <div className="space-y-4 mb-10">
                <p className="text-white text-[17px] leading-relaxed">
                  Perfeito, <span className="text-[#AAFF00] font-bold">{formData.nome}</span>! Estamos te esperando em <span className="text-[#AAFF00] font-bold">{formData.data.split('-').reverse().join('/')}</span> no horário <span className="text-[#AAFF00] font-bold">{formData.horario}</span>.
                </p>
                <p className="text-[#888] text-[15px]">
                  Nossa equipe vai entrar em contato pelo WhatsApp para confirmar.
                </p>
              </div>

              <a 
                href={formatWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-black uppercase tracking-[1px] px-8 py-5 rounded-full transition-all hover:scale-[1.05] active:scale-95 shadow-xl mb-8"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                FALAR COM A GENTE AGORA
              </a>

              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-center gap-2 text-[#666] text-sm">
                  <MapPin className="w-4 h-4 text-[#AAFF00]" />
                  Rua Colonizador Ênio Pipino, 565 — Sinop-MT
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#AAFF00] text-sm font-bold underline underline-offset-4"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] text-[#888] font-black uppercase tracking-[2px]">Nome Completo</label>
                <input 
                  required
                  type="text"
                  placeholder="Ex: João Silva"
                  className="w-full bg-[#161616] border border-[#222] rounded-2xl px-6 py-4 text-white placeholder-[#444] focus:border-[#AAFF00] focus:ring-[3px] focus:ring-[#AAFF00]/10 transition-all outline-none"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] text-[#888] font-black uppercase tracking-[2px]">WhatsApp</label>
                <input 
                  required
                  type="tel"
                  placeholder="(66) 9 0000-0000"
                  className="w-full bg-[#161616] border border-[#222] rounded-2xl px-6 py-4 text-white placeholder-[#444] focus:border-[#AAFF00] focus:ring-[3px] focus:ring-[#AAFF00]/10 transition-all outline-none"
                  value={formData.whatsapp}
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[11px] text-[#888] font-black uppercase tracking-[2px]">Data Preferida</label>
                  <div className="relative">
                    <input 
                      required
                      type="date"
                      min={minDate}
                      max={maxDate}
                      className="w-full bg-[#161616] border border-[#222] rounded-2xl px-6 py-4 text-white placeholder-[#444] focus:border-[#AAFF00] outline-none transition-all"
                      value={formData.data}
                      onChange={e => setFormData({...formData, data: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] text-[#888] font-black uppercase tracking-[2px]">Horário Preferido</label>
                  <select 
                    required
                    className="w-full bg-[#161616] border border-[#222] rounded-2xl px-6 py-4 text-white focus:border-[#AAFF00] outline-none transition-all appearance-none"
                    value={formData.horario}
                    onChange={e => setFormData({...formData, horario: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="05:00 – 07:00">05:00 – 07:00</option>
                    <option value="07:00 – 09:00">07:00 – 09:00</option>
                    <option value="09:00 – 11:00">09:00 – 11:00</option>
                    <option value="11:00 – 13:00">11:00 – 13:00</option>
                    <option value="13:00 – 15:00">13:00 – 15:00</option>
                    <option value="15:00 – 17:00">15:00 – 17:00</option>
                    <option value="17:00 – 19:00">17:00 – 19:00</option>
                    <option value="19:00 – 21:00">19:00 – 21:00</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] text-[#888] font-black uppercase tracking-[2px]">Onde você treina hoje?</label>
                <select 
                  className="w-full bg-[#161616] border border-[#222] rounded-2xl px-6 py-4 text-white focus:border-[#AAFF00] outline-none transition-all appearance-none"
                  value={formData.onde_treina}
                  onChange={e => setFormData({...formData, onde_treina: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="Não treino atualmente">Não treino atualmente</option>
                  <option value="Em outra academia">Em outra academia</option>
                  <option value="Em casa">Em casa</option>
                  <option value="Treino ao ar livre">Treino ao ar livre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] text-[#888] font-black uppercase tracking-[2px]">Qual seu objetivo principal?</label>
                <select 
                  className="w-full bg-[#161616] border border-[#222] rounded-2xl px-6 py-4 text-white focus:border-[#AAFF00] outline-none transition-all appearance-none"
                  value={formData.objetivo}
                  onChange={e => setFormData({...formData, objetivo: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="Ganho de massa muscular">Ganho de massa muscular</option>
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Condicionamento físico">Condicionamento físico</option>
                  <option value="Saúde e qualidade de vida">Saúde e qualidade de vida</option>
                  <option value="Performance atlética">Performance atlética</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[2px] py-6 rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(170,255,0,0.4)] disabled:opacity-50 text-[17px] mt-6 shadow-xl active:scale-95"
              >
                {loading ? 'PROCESSANDO...' : 'QUERO AGENDAR MINHA VISITA'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* O QUE ACONTECE NA SUA VISITA */}
      <section className="bg-[#0A0A0A] py-32 px-6">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="text-[#AAFF00] font-black text-[12px] uppercase tracking-[4px] mb-4 block">EXPERIÊNCIA ELITE+</span>
            <h2 className="font-bebas text-[52px] md:text-[64px] text-white tracking-tighter uppercase">
              O QUE ACONTECE NA <span className="text-[#AAFF00]">SUA VISITA</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111] border-l-[3px] border-[#AAFF00] rounded-2xl p-8 relative overflow-hidden group hover:bg-[#161616] transition-all">
              <span className="font-bebas text-[64px] text-[#AAFF00] opacity-10 absolute top-4 right-8 select-none">01</span>
              <div className="bg-[#AAFF00]/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#AAFF00] mb-8 group-hover:bg-[#AAFF00] group-hover:text-[#0A0A0A] transition-all">
                <DoorOpen className="w-8 h-8" />
              </div>
              <h3 className="font-bebas text-[28px] text-white mb-4 tracking-wide">VOCÊ CHEGA</h3>
              <p className="text-[#666] font-inter text-[16px] leading-relaxed group-hover:text-[#AAA] transition-all">
                Sem formulário chato. Só fala seu nome na recepção e já é recebido pela equipe.
              </p>
            </div>

            <div className="bg-[#111] border-l-[3px] border-[#AAFF00] rounded-2xl p-8 relative overflow-hidden group hover:bg-[#161616] transition-all">
              <span className="font-bebas text-[64px] text-[#AAFF00] opacity-10 absolute top-4 right-8 select-none">02</span>
              <div className="bg-[#AAFF00]/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#AAFF00] mb-8 group-hover:bg-[#AAFF00] group-hover:text-[#0A0A0A] transition-all">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="font-bebas text-[28px] text-white mb-4 tracking-wide">A GENTE TE MOSTRA TUDO</h3>
              <p className="text-[#666] font-inter text-[16px] leading-relaxed group-hover:text-[#AAA] transition-all">
                Tour completo: salão, app de treino, espaço kids, estacionamento. Sem pressa.
              </p>
            </div>

            <div className="bg-[#111] border-l-[3px] border-[#AAFF00] rounded-2xl p-8 relative overflow-hidden group hover:bg-[#161616] transition-all">
              <span className="font-bebas text-[64px] text-[#AAFF00] opacity-10 absolute top-4 right-8 select-none">03</span>
              <div className="bg-[#AAFF00]/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#AAFF00] mb-8 group-hover:bg-[#AAFF00] group-hover:text-[#0A0A0A] transition-all">
                <Dumbbell className="w-8 h-8" />
              </div>
              <h3 className="font-bebas text-[28px] text-white mb-4 tracking-wide">SAI COM O TREINO MONTADO</h3>
              <p className="text-[#666] font-inter text-[16px] leading-relaxed group-hover:text-[#AAA] transition-all">
                Se gostar, a gente já monta seu treino na hora. Você sai sabendo exatamente o que fazer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
