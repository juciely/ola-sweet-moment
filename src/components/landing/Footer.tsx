import { useSiteConfig } from '@/hooks/useSiteConfig';

export function Footer() {
  const { config } = useSiteConfig();

  const handleWhatsApp = () => {
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(config.whatsapp_mensagem || '');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-[#111111] py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Bloco 1 — Horários */}
        <div className="space-y-6">
          <h3 className="font-bebas text-2xl text-white">HORÁRIOS</h3>
          <div className="space-y-3 font-inter text-sm text-[#888888]">
            <p className="flex justify-between">
              {config.horario_semana}
            </p>
            <p className="flex justify-between">
              {config.horario_sabado}
            </p>
            <p className="flex justify-between">
              {config.horario_feriado}
            </p>
          </div>
        </div>

        {/* Bloco 2 — Localização */}
        <div className="space-y-6">
          <h3 className="font-bebas text-2xl text-white">ONDE ESTAMOS</h3>
          <div className="space-y-4">
            <p className="font-inter text-sm text-[#888888] leading-relaxed">
              {config.endereco}
            </p>
            <a 
              href="https://maps.google.com/?q=Rua+Colonizador+Enio+Pipino+565+Sinop+MT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-[#AAFF00] text-sm font-bold tracking-[1px] uppercase border-b border-[#AAFF00]/30 pb-1 hover:border-[#AAFF00] transition-colors"
            >
              Ver no Google Maps
            </a>
          </div>
        </div>

        {/* Bloco 3 — Contato */}
        <div className="space-y-6">
          <h3 className="font-bebas text-2xl text-white">FALE CONOSCO</h3>
          <div className="space-y-4">
            <button 
              onClick={handleWhatsApp}
              className="text-white text-lg font-bebas tracking-wider block hover:text-[#AAFF00] transition-colors"
            >
              (66) 9 9997-0103
            </button>
            <p className="font-inter text-sm text-[#555] uppercase tracking-wider">
              Atendimento de segunda a sábado
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#222] text-center">
        <p className="font-inter text-[12px] text-[#444444] uppercase tracking-widest">
          © 2025 Elite+ Performance. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
