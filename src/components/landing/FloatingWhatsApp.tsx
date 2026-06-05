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
      className="fixed bottom-8 right-8 z-[999] bg-[#AAFF00] text-[#0A0A0A] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(170,255,0,0.4)] animate-pulse transition-transform hover:scale-110 active:scale-95"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
    </button>
  );
}
