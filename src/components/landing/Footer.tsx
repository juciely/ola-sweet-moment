import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTracking } from '@/hooks/useTracking';

export function Footer() {
  const { config } = useSiteConfig();
  const { trackWhatsappClick } = useTracking();

  const handleWhatsApp = () => {
    trackWhatsappClick('Footer Button');
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(config.whatsapp_mensagem || '');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#1A1A1A] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 reveal">
        {/* Col 1 */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <img src="/logo.png" alt="Elite+ Performance" className="w-40 mb-4" />
          </div>
          <p className="font-inter text-sm text-[#555] max-w-[200px] leading-relaxed">
            Academia completa em Sinop-MT.<br />
            Seu próximo nível começa aqui.
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-6">
          <h3 className="font-inter text-[12px] text-[#AAFF00] uppercase tracking-[2px] font-bold">HORÁRIOS</h3>
          <div className="space-y-3 font-inter text-sm text-[#666]">
            <p className="flex justify-between">{config.horario_semana || 'Segunda a Sexta — 05h às 22h'}</p>
            <p className="flex justify-between">{config.horario_sabado || 'Sábado — 08h às 14h'}</p>
            <p className="flex justify-between">{config.horario_feriado || 'Feriados — 08h às 12h'}</p>
          </div>
        </div>

        {/* Col 3 */}
        <div className="space-y-6">
          <h3 className="font-inter text-[12px] text-[#AAFF00] uppercase tracking-[2px] font-bold">CONTATO</h3>
          <div className="space-y-4">
            <button 
              onClick={handleWhatsApp}
              className="text-white text-lg font-bebas tracking-wider hover:text-[#AAFF00] transition-colors"
            >
              {config.whatsapp_exibicao || '(66) 9 9997-0103'}
            </button>
            <p className="font-inter text-[13px] text-[#666] leading-relaxed">
              {config.endereco || 'Rua Colonizador Enio Pipino, 565 - Sinop-MT'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#1A1A1A] text-center">
        <p className="font-inter text-[12px] text-[#333] tracking-widest">
          © 2025 ELITE+ PERFORMANCE — SINOP-MT
        </p>
      </div>
    </footer>
  );
}
