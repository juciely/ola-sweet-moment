import { createFileRoute } from '@tanstack/react-router';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Countdown } from '@/components/landing/Countdown';
import { Diferenciais } from '@/components/landing/Diferenciais';
import { Planos } from '@/components/landing/Planos';
import { LeadForm } from '@/components/landing/LeadForm';
import { Footer } from '@/components/landing/Footer';
import { FloatingWhatsApp } from '@/components/landing/FloatingWhatsApp';
import { useReveal } from '@/hooks/useReveal';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { config, loading } = useSiteConfig();
  const revealRef = useReveal();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#AAFF00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(config.whatsapp_mensagem || '');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  const marquee1 = config.marquee_linha1 || "⚡ REINAUGURAÇÃO OFICIAL  •  PLANO ANUAL POR R$119,90/MÊS  •  APP DE TREINO INCLUSO  •  PROFESSORES CREF  •  ESTACIONAMENTO GRÁTIS  ⚡";
  const marquee2 = config.marquee_linha2 || "🔥 ESPAÇO KIDS  •  DUCHA COMPLETA  •  05H ÀS 22H  •  SEU PRÓXIMO NÍVEL COMEÇA AQUI  •  ELITE+ PERFORMANCE  •  SINOP-MT  🔥";

  return (
    <main ref={revealRef as any} className="bg-[#080808] text-white min-h-screen selection:bg-[#AAFF00] selection:text-[#080808] relative overflow-x-hidden">
      
      {/* HERO */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-16 pb-16 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a39988333?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Atmosphere" 
            className="w-full h-full object-cover grayscale opacity-30 scale-110 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#080808] via-transparent to-[#080808]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full reveal">
          <div className="bg-[#AAFF00]/10 border border-[#AAFF00]/20 text-[#AAFF00] text-[9px] md:text-[11px] font-bold uppercase tracking-[2px] md:tracking-[3px] px-4 md:px-5 py-1.5 md:py-2 rounded-full mb-8 md:mb-10 backdrop-blur-sm whitespace-nowrap">
            SINOP-MT — O NOVO PADRÃO DE PERFORMANCE
          </div>

          <h1 className="font-bebas text-[60px] sm:text-[80px] md:text-[120px] leading-[0.85] mb-8 tracking-tighter uppercase">
            PARE DE <span className="text-[#AAFF00]">TENTAR.</span><br />
            COMECE A <span className="text-white italic">TREINAR.</span>
          </h1>

          <p className="font-inter text-[16px] md:text-[20px] text-[#AAAAAA] max-w-[600px] mb-12 leading-relaxed font-light">
            A Elite+ Performance é para quem busca resultados reais em Sinop. Estrutura premium, acompanhamento profissional e tecnologia a serviço da sua evolução.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-16 w-full sm:w-auto">
            <button 
              onClick={handleWhatsApp}
              className="group bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] px-10 py-4 rounded-full transition-all hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(170,255,0,0.4)] text-[16px] active:scale-95 shadow-xl"
            >
              GARANTIR MINHA VAGA
            </button>
            
            <button 
              onClick={() => {
                if (typeof document !== 'undefined') {
                  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="text-white font-inter font-bold border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/40 transition-all text-[16px] active:scale-95"
            >
              CONHECER PLANOS
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16 font-bebas text-[18px] md:text-[24px] text-[#555] tracking-widest uppercase">
            <div className="flex flex-col items-center">
              <span className="text-[#AAFF00]">05H–22H</span>
              <span className="text-[10px] font-inter font-bold tracking-[2px] opacity-40">Horário</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white">APP</span>
              <span className="text-[10px] font-inter font-bold tracking-[2px] opacity-40">Incluso</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white">CREF</span>
              <span className="text-[10px] font-inter font-bold tracking-[2px] opacity-40">Certificado</span>
            </div>
          </div>
        </div>
      </section>

      {/* DOUBLE MARQUEE ANIMADO */}
      <div className="relative h-[120px] w-[100vw] ml-[calc(-50vw+50%)] overflow-hidden bg-transparent z-[20] my-4">
        {/* FAIXA 1 */}
        <div 
          className="absolute top-[20px] left-0 w-full h-[44px] bg-[#AAFF00] flex items-center overflow-hidden whitespace-nowrap z-[2]"
          style={{ transform: 'rotate(-3deg)' }}
        >
          <div 
            className="flex gap-8 px-4 font-bebas text-[22px] text-[#0A0A0A] tracking-[2px] uppercase whitespace-nowrap"
            style={{ animation: 'marquee-left 25s linear infinite' }}
          >
            <span>{marquee1}</span>
            <span>{marquee1}</span>
            <span>{marquee1}</span>
          </div>
        </div>

        {/* FAIXA 2 */}
        <div 
          className="absolute top-[60px] left-0 w-full h-[44px] bg-[#1A1A1A] border-y border-[#AAFF00] flex items-center overflow-hidden whitespace-nowrap z-[1]"
          style={{ transform: 'rotate(3deg)' }}
        >
          <div 
            className="flex gap-8 px-4 font-bebas text-[22px] text-[#AAFF00] tracking-[2px] uppercase whitespace-nowrap"
            style={{ animation: 'marquee-right 20s linear infinite' }}
          >
            <span>{marquee2}</span>
            <span>{marquee2}</span>
            <span>{marquee2}</span>
          </div>
        </div>
      </div>

      {/* STORYTELLING */}
      <section className="bg-[#0A0A0A] py-32 px-8 relative overflow-hidden">
        <div className="container-custom relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 reveal order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 bg-linear-to-r from-[#AAFF00] to-[#000] rounded-[32px] blur-2xl opacity-10 group-hover:opacity-20 transition-all"></div>
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                alt="Premium Gym Equipment" 
                className="rounded-[32px] w-full relative shadow-2xl border border-white/5 transition-transform duration-500 group-hover:scale-[1.02]" 
              />
            </div>
          </div>
          <div className="flex-1 reveal order-1 lg:order-2">
            <span className="text-[#AAFF00] font-inter text-[12px] font-black uppercase tracking-[4px] mb-6 block">Evolução Constante</span>
            <h2 className="font-bebas text-[50px] md:text-[70px] leading-tight mb-8">
              MUDAMOS O NOME.<br />
              <span className="text-[#AAFF00]">ELEVAMOS O PADRÃO.</span>
            </h2>
            <div className="space-y-6">
              <p className="font-inter text-[16px] md:text-[18px] text-[#AAAAAA] leading-relaxed font-light">
                A Agitare foi por anos a academia de referência em Sinop. Mas a gente sabia que podia ser mais. Mais estrutura. Mais tecnologia. Mais resultado para quem não aceita o básico.
              </p>
              <p className="font-inter text-[16px] md:text-[18px] text-[#AAAAAA] leading-relaxed font-light">
                Hoje somos a <strong>Elite+ Performance</strong>. O mesmo compromisso com o seu resultado — agora com o padrão que você merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REINVENTED DIFFERENTIATORS */}
      <Diferenciais />

      <div id="planos" className="relative">
        <Planos />
      </div>

      {/* FAQ SECTION */}
      <section className="bg-[#080808] py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="text-[#AAFF00] font-inter text-[12px] font-black uppercase tracking-[4px] mb-4 block">DÚVIDAS</span>
            <h2 className="font-bebas text-[50px] md:text-[60px] text-white">
              PERGUNTAS <span className="text-[#AAFF00]">FREQUENTES</span>
            </h2>
          </div>
          
          <div className="grid gap-4">
            {[
              { 
                q: "Preciso ter experiência pra treinar aqui?", 
                r: "Não. Atendemos desde iniciantes a atletas experientes. Na sua primeira visita, um professor avalia seu perfil e monta um treino específico. Você nunca treinará sozinho ou perdido." 
              },
              { 
                q: "O app de treino tem custo extra?", 
                r: "Absolutamente não. O aplicativo é parte fundamental da nossa metodologia e está incluso em 100% dos nossos planos." 
              },
              { 
                q: "Tenho filho pequeno. Posso levar?", 
                r: "Sim! Temos um Espaço Kids estruturado e seguro para que você possa focar no seu treino enquanto seu filho se diverte por perto." 
              },
              { 
                q: "Como funciona o Plano Recorrente?", 
                r: "É o nosso plano de melhor custo-benefício. O valor é debitado mensalmente no seu cartão sem comprometer o limite total, com um contrato de 12 meses." 
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-[#111] border border-white/5 rounded-[20px] overflow-hidden reveal hover:border-[#AAFF00]/20 transition-all">
                <summary className="flex items-center justify-between p-7 cursor-pointer list-none">
                  <span className="font-inter font-bold text-white text-[16px] md:text-[18px]">{faq.q}</span>
                  <span className="text-[#AAFF00] text-2xl transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-7 pb-7 text-[#777] font-inter text-[15px] md:text-[16px] leading-relaxed font-light">
                  {faq.r}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}