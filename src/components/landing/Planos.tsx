import { usePlanos } from '@/hooks/usePlanos';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export function Planos() {
  const { planos, loading } = usePlanos();
  const { config } = useSiteConfig();

  const handleWhatsApp = (planoNome: string) => {
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(`Olá! Tenho interesse no ${planoNome} da Elite+ Performance.`);
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-[#111111]">
        <div className="w-8 h-8 border-3 border-[#AAFF00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="bg-[#111111] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bebas text-5xl md:text-6xl text-white mb-16 text-center">
          ESCOLHA SEU PLANO
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-start">
          {planos.map((plano) => (
            <div 
              key={plano.id}
              className={`relative bg-[#1A1A1A] p-6 md:p-8 border transition-all duration-300 ${
                plano.destaque 
                  ? 'border-[#AAFF00] scale-[1.03] z-10 shadow-[0_0_40px_rgba(170,255,0,0.1)]' 
                  : 'border-[#222222] hover:border-[#444]'
              }`}
            >
              {plano.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#AAFF00] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-[2px] whitespace-nowrap">
                  MAIS POPULAR
                </div>
              )}

              <h3 className="font-bebas text-2xl md:text-3xl text-white mb-1">
                {plano.nome}
              </h3>
              
              <span className="font-inter text-[11px] md:text-xs text-[#555555] uppercase tracking-[2px] block mb-8">
                {plano.duracao}
              </span>

              <div className="flex items-baseline mb-8">
                <span className={`font-bebas text-3xl md:text-4xl ${plano.destaque ? 'text-[#AAFF00]' : 'text-white'}`}>
                  R$ {Number(plano.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                {(plano.duracao.toLowerCase().includes('mês') || plano.duracao.toLowerCase().includes('meses')) && (
                  <span className="text-[#555] font-bebas text-xl ml-1">/MÊS</span>
                )}
              </div>

              <button 
                onClick={() => handleWhatsApp(plano.nome)}
                className={`w-full py-4 text-[12px] font-bold uppercase tracking-[1px] transition-all rounded-[2px] ${
                  plano.destaque
                    ? 'bg-[#AAFF00] text-[#0A0A0A] hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(170,255,0,0.3)]'
                    : 'bg-transparent border border-[#333] text-white hover:border-[#AAFF00] hover:text-[#AAFF00]'
                }`}
              >
                QUERO ESSE PLANO
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
