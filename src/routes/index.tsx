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
  
  useEffect(() => {
    console.log('Index mounted, revealRef:', revealRef.current);
  }, []);

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

  return (
    <main ref={revealRef as any} className="bg-[#080808] text-white min-h-screen selection:bg-[#AAFF00] selection:text-[#080808]">
      {/* SCROLLING BAR */}
      <div className="fixed top-0 left-0 w-full bg-[#AAFF00] z-[1000] overflow-hidden h-[36px] flex items-center">
        <div className="animate-marquee whitespace-nowrap font-inter text-[13px] font-semibold text-[#0A0A0A] flex gap-8 px-4">
          <span>⚡ A melhor academia de Sinop agora evoluiu — Venha treinar com a gente • Elite+ Performance • Reinauguração com oferta especial • App de treino incluso em todos os planos • Professores com CREF • Estacionamento grátis • Espaço Kids ⚡</span>
          <span aria-hidden="true">⚡ A melhor academia de Sinop agora evoluiu — Venha treinar com a gente • Elite+ Performance • Reinauguração com oferta especial • App de treino incluso em todos os planos • Professores com CREF • Estacionamento grátis • Espaço Kids ⚡</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40">
           <div className="absolute inset-0 bg-linear-to-b from-[#080808]/70 to-[#080808]/95"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full reveal">
          <div className="bg-[#161616] border border-[#333] text-[11px] font-bold uppercase tracking-[2px] px-6 py-2 rounded-full mb-8 text-[#AAFF00]">
            REINAUGURAÇÃO OFICIAL — SINOP-MT
          </div>

          <h1 className="font-bebas text-[80px] md:text-[110px] leading-[0.9] mb-8 tracking-tight">
            VOCÊ NÃO PRECISA DE<br />
            MAIS UM COMEÇO <span className="text-[#AAFF00]">FALSO.</span>
          </h1>

          <p className="font-inter text-[19px] text-[#AAAAAA] max-w-[500px] mb-10 leading-relaxed">
            A Elite+ Performance nasceu pra quem já tentou antes e sabe que dessa vez precisa ser diferente. Treino no seu objetivo. Professor que te vê. App que te acompanha. Resultado que aparece.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <button 
              onClick={handleWhatsApp}
              className="group bg-[#AAFF00] text-[#0A0A0A] font-extrabold uppercase tracking-[1px] px-12 py-5 rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(170,255,0,0.55)] text-[17px]"
              style={{ boxShadow: '0 0 40px rgba(170,255,0,0.35)' }}
            >
              QUERO COMEÇAR DE VERDADE
            </button>
            
            <button 
              onClick={() => {
                if (typeof document !== 'undefined') {
                  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="text-[#888] font-inter font-semibold border border-[#333] px-8 py-5 rounded-full hover:text-white hover:border-white transition-all text-[17px]"
            >
              Ver planos ↓
            </button>
          </div>

          <div className="flex gap-4 md:gap-8 font-inter text-[13px] text-[#555] items-center">
            <span>05h–22h</span>
            <span>•</span>
            <span>App incluso</span>
            <span>•</span>
            <span>CREF certificado</span>
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="bg-[#111111] py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 reveal">
            <span className="text-[#AAFF00] font-inter text-[12px] uppercase tracking-[3px] mb-4 block">NOSSA HISTÓRIA</span>
            <h2 className="font-bebas text-[52px] leading-none mb-6">
              MUDAMOS O NOME.<br />
              ELEVAMOS O PADRÃO.
            </h2>
            <p className="font-inter text-[17px] text-[#AAAAAA] leading-[1.8]">
              A Agitare foi por anos a academia de referência em Sinop. Mas a gente sabia que podia ser mais. Mais estrutura. Mais tecnologia. Mais resultado pra quem acorda cedo, treina no intervalo do almoço ou chega cansado depois do trabalho e ainda assim não desiste.<br /><br />
              Hoje somos a Elite+ Performance. O mesmo compromisso com o seu resultado — agora com o padrão que você merece.
            </p>
          </div>
          <div className="flex-1 w-full reveal">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a39988333?q=80&w=2070&auto=format&fit=crop" alt="Gym" className="rounded-[24px] w-full" />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-[#111111] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bebas text-[52px] text-white text-center mb-16 reveal">
            PERGUNTAS FREQUENTES
          </h2>
          
          <div className="space-y-3">
            {[
              { 
                q: "Preciso ter experiência pra treinar aqui?", 
                r: "Não. A Elite+ Performance atende desde quem nunca pisou numa academia até atletas experientes. Na sua primeira visita, o professor avalia seu histórico e monta um treino no seu ritmo e objetivo. Você nunca vai ficar perdido no salão." 
              },
              { 
                q: "O app de treino tem custo extra?", 
                r: "Não. O aplicativo está incluso em todos os planos. Assim que você fecha a matrícula, já sai daqui com o treino montado no celular — com vídeos dos exercícios, nome dos aparelhos e tudo explicado." 
              },
              { 
                q: "Tenho filho pequeno. Posso levar?", 
                r: "Pode. Temos espaço kids estruturado pra você treinar com tranquilidade enquanto seu filho fica bem cuidado. Sem precisar arranjar babá pra malhar." 
              },
              { 
                q: "Qual a diferença do Plano Recorrente pro Mensal normal?", 
                r: "O Recorrente é um contrato de 12 meses com cobrança mensal de R$119,90 — o menor valor por mês que temos. O Mensal é sem contrato, paga mês a mês por R$160,00. Se você sabe que vai continuar treinando, o Recorrente economiza R$481,20 por ano." 
              },
              { 
                q: "Tem aula em grupo ou só musculação?", 
                r: "Trabalhamos com treino personalizado individual — cada aluno tem seu treino montado pelo professor. Não é aula coletiva. É atenção no seu objetivo específico." 
              },
              { 
                q: "Como funciona a promoção de reinauguração?", 
                r: "Durante o período de reinauguração, a primeira mensalidade do Plano Recorrente sai com desconto especial. É por tempo limitado. Depois o valor volta ao normal de R$119,90. Chama a gente no WhatsApp pra garantir antes de acabar." 
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-[#161616] border border-[#1E1E1E] rounded-[12px] overflow-hidden reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-inter font-semibold text-white">{faq.q}</span>
                  <span className="text-[#AAFF00] text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#777] font-inter text-[15px] leading-[1.7]">
                  {faq.r}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Diferenciais />
      <div id="planos">
        <Planos />
      </div>
      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
