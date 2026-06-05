import { createFileRoute } from '@tanstack/react-router';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Countdown } from '@/components/landing/Countdown';
import { Diferenciais } from '@/components/landing/Diferenciais';
import { Planos } from '@/components/landing/Planos';
import { LeadForm } from '@/components/landing/LeadForm';
import { Footer } from '@/components/landing/Footer';
import { FloatingWhatsApp } from '@/components/landing/FloatingWhatsApp';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { config, loading } = useSiteConfig();

  useEffect(() => {
    if (!loading) {
      document.title = "Elite+ Performance — Academia em Sinop-MT";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Treino personalizado com app incluso, professores CREF, estacionamento e espaço kids. Planos a partir de R$119,90/mês.');
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#AAFF00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(config.whatsapp_mensagem || '');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  const renderTitle = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(ELITE\+)/gi);
    return parts.map((part, i) => 
      part.toUpperCase() === 'ELITE+' ? 
      <span key={i} className="text-[#AAFF00]">ELITE+</span> : 
      part
    );
  };

  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen selection:bg-[#AAFF00] selection:text-[#0A0A0A] scroll-smooth">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20 pb-12">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/85"></div>
          <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
              backgroundImage: 'linear-gradient(#AAFF00 1px, transparent 1px), linear-gradient(90deg, #AAFF00 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
          {config.oferta_badge && (
            <div className="bg-[#AAFF00] text-[#0A0A0A] text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-[2px] mb-8 animate-fade-in">
              {config.oferta_badge}
            </div>
          )}

          <h1 className="font-bebas text-[72px] md:text-[96px] leading-[0.9] mb-6 tracking-tight">
            {renderTitle(config.hero_titulo)}
          </h1>

          <p className="font-inter text-lg text-[#AAAAAA] max-width-[480px] mb-10 leading-relaxed">
            {config.hero_subtitulo}
          </p>

          <button 
            onClick={handleWhatsApp}
            className="group relative bg-[#AAFF00] text-[#0A0A0A] font-bold uppercase tracking-[1px] px-10 py-5 rounded-[4px] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(170,255,0,0.3)] mb-4"
          >
            {config.hero_cta}
          </button>

          <span className="text-[#555555] text-[13px] font-medium">
            #1 EM TREINO PERSONALIZADO EM SINOP-MT
          </span>
        </div>
      </section>

      {/* SECTION 2 — OFERTA DE REINAUGURAÇÃO */}
      <section className="bg-[#111111] py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AAFF00]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[520px] mx-auto text-center relative z-10">
          <div className="inline-block border border-[#AAFF00] text-[#AAFF00] text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-[2px] mb-8">
            OFERTA ESPECIAL
          </div>

          <h2 className="font-bebas text-[52px] md:text-[64px] leading-none mb-8">
            {config.oferta_titulo}
          </h2>

          <div className="flex flex-col items-center mb-8">
            <span className="text-[#555] text-xl line-through mb-1">
              R$ {config.oferta_preco_riscado}/mês
            </span>
            <div className="flex items-start">
              <span className="font-bebas text-2xl mt-4 mr-2 text-[#AAFF00]">R$</span>
              <span className="font-bebas text-[80px] md:text-[100px] leading-none text-[#AAFF00]">
                {config.oferta_preco}
              </span>
              <span className="font-bebas text-2xl mt-14 ml-2 text-[#AAFF00]">/mês</span>
            </div>
          </div>

          <p className="font-inter text-[15px] text-[#888888] mb-12 leading-relaxed">
            {config.oferta_descricao}
          </p>

          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#AAFF00] text-[#0A0A0A] font-bold uppercase tracking-[1px] px-10 py-5 rounded-[4px] transition-all hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(170,255,0,0.2)] mb-12"
          >
            GARANTIR MINHA VAGA
          </button>

          <div className="flex flex-col items-center pt-8 border-t border-white/5">
            <span className="text-[#888] text-sm uppercase tracking-widest mb-4">
              Oferta válida por:
            </span>
            <Countdown />
          </div>
        </div>
      </section>

      {/* SECTION 3 — DIFERENCIAIS */}
      <Diferenciais />

      {/* SECTION 4 — PLANOS */}
      <Planos />

      {/* SECTION 5 — FORMULÁRIO DE LEAD */}
      <LeadForm />

      {/* SECTION 6 — FOOTER */}
      <Footer />

      {/* COMPONENTE FIXO — BOTÃO WHATSAPP */}
      <FloatingWhatsApp />
    </main>
  );
}
