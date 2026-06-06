import { useState } from 'react';
import { usePlanos } from '@/hooks/usePlanos';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTracking } from '@/hooks/useTracking';
import { ChevronDown, Check } from 'lucide-react';

export function Planos() {
  const { planos, loading } = usePlanos();
  const { config } = useSiteConfig();
  const [billing, setBilling] = useState<'MENSAL' | 'ANUAL'>('MENSAL');
  const [showTable, setShowTable] = useState(false);
  const { trackWhatsappClick, trackButtonClick } = useTracking();

  const handleWhatsApp = (planoNome: string) => {
    trackWhatsappClick(planoNome);
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(`Olá! Tenho interesse no ${planoNome} da Elite+ Performance.`);
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-[#111111]">
        <div className="w-8 h-8 border-3 border-[#d7f803] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const mensalPlans = [
    { nome: 'Plano Mensal', preco: 160, duracao: 'MENSAL', benefits: ['App de treino personalizado', 'Professor CREF no piso', 'Acesso ilimitado + estacionamento'] },
    { nome: 'Plano Dupla', preco: 140, duracao: 'MENSAL', suffix: '/pessoa', benefits: ['Treine com um amigo', 'Professor CREF no piso', 'Acesso ilimitado + estacionamento'] },
    { nome: 'Plano Recorrente', preco: 119.90, duracao: '12 MESES', highlight: true, badge: 'MAIS POPULAR', benefits: ['App de treino personalizado', 'Professor CREF no piso', 'Acesso ilimitado + estacionamento'] }
  ];

  const anualPlans = [
    { nome: 'Plano Trimestral', preco: 360, duracao: '3 MESES', benefits: ['Economia garantida', 'Professor CREF no piso', 'Acesso ilimitado + estacionamento'] },
    { nome: 'Plano Semestral', preco: 660, duracao: '6 MESES', benefits: ['Foco no resultado', 'Professor CREF no piso', 'Acesso ilimitado + estacionamento'] },
    { nome: 'Plano Anual', preco: 1140, duracao: '12 MESES', highlight: true, badge: 'MELHOR CUSTO', benefits: ['Melhor custo-benefício', 'Professor CREF no piso', 'Acesso ilimitado + estacionamento'] }
  ];

  const currentPlans = billing === 'MENSAL' ? mensalPlans : anualPlans;

  return (
    <section className="bg-[#111111] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-poppins font-black text-[36px] md:text-[52px] text-white text-center mb-2 leading-[1.1] reveal">
          PLANOS QUE CABEM NA SUA VIDA
        </h2>
        <p className="font-inter text-base text-[#666666] text-center mb-12 reveal">
          Sem taxa de matrícula. Sem letra miúda. Só resultado.
        </p>

        {/* TOGGLE */}
        <div className="flex items-center gap-4 mb-16 reveal">
          <div className="bg-[#1A1A1A] p-1 rounded-full flex">
            <button 
              onClick={() => setBilling('MENSAL')}
              className={`px-8 py-2.5 rounded-full font-inter text-sm font-semibold transition-all ${billing === 'MENSAL' ? 'bg-[#d7f803] text-[#0A0A0A]' : 'text-[#666]'}`}
            >
              MENSAL
            </button>
            <button 
              onClick={() => setBilling('ANUAL')}
              className={`px-8 py-2.5 rounded-full font-inter text-sm font-semibold transition-all ${billing === 'ANUAL' ? 'bg-[#d7f803] text-[#0A0A0A]' : 'text-[#666]'}`}
            >
              ANUAL
            </button>
          </div>
          {billing === 'ANUAL' && (
            <span className="text-[#d7f803] font-bold text-xs uppercase tracking-wider animate-pulse">ECONOMIZE 25%</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
          {currentPlans.map((plano, i) => (
            <div 
              key={i}
              className={`relative bg-[#161616] p-8 rounded-[20px] flex flex-col border transition-all duration-300 reveal ${plano.highlight ? 'border-[#d7f803] shadow-[0_0_48px_rgba(215,248,3,0.12)]' : 'border-[#222]'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plano.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d7f803] text-[#0A0A0A] text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {plano.badge}
                </div>
              )}

              <h3 className="font-poppins font-bold text-[22px] md:text-[24px] text-white mb-1 uppercase tracking-tight">{plano.nome}</h3>
              <p className="text-[#555] font-inter text-[13px] tracking-wider mb-8 uppercase letter-spacing-[1px]">{plano.duracao}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white font-bebas text-2xl">R$</span>
                <span className={`font-bebas text-[64px] leading-none ${plano.highlight ? 'text-[#d7f803]' : 'text-white'}`}>
                  {plano.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[#666] font-inter text-base ml-1">{(plano as any).suffix || '/mês'}</span>
              </div>

              <div className="h-[1px] bg-[#1E1E1E] w-full mb-[24px]"></div>

              <div className="space-y-4 mb-10 flex-grow">
                {plano.benefits.map((b, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-[#d7f803] flex-shrink-0" />
                    <span className="text-[#AAA] text-sm font-inter leading-tight">{b}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleWhatsApp(plano.nome)}
                className={`w-full py-4 md:py-5 rounded-full font-black uppercase tracking-wider transition-all text-sm md:text-base ${plano.highlight ? 'bg-[#d7f803] text-[#0A0A0A] hover:shadow-[0_0_35px_rgba(215,248,3,0.4)]' : 'border border-[#333] text-white hover:border-[#d7f803] hover:bg-white/5'}`}
              >
                QUERO ESSE PLANO
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 reveal">
          <p className="text-[#555] font-inter text-sm">
            Quer conhecer antes de decidir? <a href="/agendar" onClick={() => trackButtonClick('Agendar Visita Link', 'Planos')} className="text-[#555] hover:text-[#d7f803] font-bold underline underline-offset-4 transition-colors">Agende uma visita gratuita →</a>
          </p>

          <button 
            onClick={() => setShowTable(!showTable)}
            className="text-[#555] hover:text-[#d7f803] transition-colors flex items-center gap-2 text-sm font-inter"
          >
            Ver todos os planos disponíveis <ChevronDown className={`w-4 h-4 transition-transform ${showTable ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showTable && (
          <div className="mt-12 w-full bg-[#161616] rounded-[20px] p-6 border border-[#222] overflow-hidden reveal">
            <table className="w-full text-left font-inter text-sm">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="py-4 font-bold text-[#AAA]">PLANO</th>
                  <th className="py-4 font-bold text-[#AAA]">DURAÇÃO</th>
                  <th className="py-4 font-bold text-[#AAA] text-right">VALOR</th>
                </tr>
              </thead>
              <tbody>
                {planos.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleWhatsApp(p.nome)}>
                    <td className="py-4 font-bold">{p.nome}</td>
                    <td className="py-4 text-[#777]">{p.duracao}</td>
                    <td className="py-4 text-right font-bold text-[#d7f803]">R$ {Number(p.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
