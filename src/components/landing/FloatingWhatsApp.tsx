import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export function FloatingWhatsApp() {
  const { config } = useSiteConfig();

  const handleWhatsApp = () => {
    const number = config.whatsapp_numero || '5566999970103';
    const message = encodeURIComponent(config.whatsapp_mensagem || '');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-8 right-8 z-[999] bg-[#AAFF00] text-[#0A0A0A] px-6 py-4 rounded-[50px] flex items-center gap-3 shadow-[0_0_32px_rgba(170,255,0,0.4)] animate-pulse transition-all hover:scale-105 active:scale-95 group"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="hidden md:inline font-inter font-bold text-sm tracking-wide">FALE CONOSCO</span>
    </button>
  );
}
