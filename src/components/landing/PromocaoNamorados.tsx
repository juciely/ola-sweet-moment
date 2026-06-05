import { useState } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTracking } from '@/hooks/useTracking';
import { Copy, Check, MessageCircle, Heart } from 'lucide-react';

export function PromocaoNamorados() {
  const { config } = useSiteConfig();
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { trackWhatsappClick } = useTracking();

  const titulo = config.promocao_titulo || 'PROMOÇÃO JUNHO DOS NAMORADOS';
  const subtitulo = config.promocao_subtitulo || 'O AMOR TREINA JUNTO';
  const preco = config.promocao_preco || '99,90';
  const condicoes = config.promocao_condicoes || 'Válido para o primeiro mês por pessoa. Promoção exclusiva para casais que fecharem o plano juntos.';
  const cupom = config.promocao_cupom || 'ELITENAMORADOS99';
  const whatsappLink = `https://wa.me/${config.whatsapp_numero || '5566999970103'}?text=${encodeURIComponent(`Olá! Gostaria de aproveitar a promoção de namorados. Cupom: ${cupom}`)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cupom);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 px-8 overflow-hidden bg-[#0A0A0A]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#AAFF00] rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#111] to-[#080808] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Visual Section */}
            <div className="md:w-1/3 bg-gradient-to-br from-red-600/20 to-transparent p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/5">
              <Heart className="w-16 h-16 text-red-500 mb-6 animate-pulse" />
              <div className="font-poppins font-black text-[48px] leading-none mb-2">R$ <span className="text-[#AAFF00]">{preco}</span></div>
              <p className="font-inter text-[14px] text-white/60 uppercase tracking-widest font-bold">Por pessoa / 1º Mês</p>
              
              <div className="mt-8 pt-8 border-t border-white/10 w-full">
                <p className="font-poppins text-[20px] font-bold text-white/80 mb-4 tracking-widest uppercase">Formas de Pagamento</p>
                <div className="flex flex-wrap justify-center gap-3 grayscale opacity-70">
                   <img src="https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png" className="h-4 object-contain" alt="Visa" />
                   <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png" className="h-4 object-contain" alt="Mastercard" />
                   <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-4 object-contain" alt="PIX" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 md:p-12">
              <span className="text-red-500 font-poppins text-[12px] font-black uppercase tracking-[4px] mb-4 block">{subtitulo}</span>
              <h2 className="font-poppins font-black text-[32px] md:text-[60px] leading-[1.1] mb-6">
                {titulo}
              </h2>
              <p className="font-inter text-[#AAAAAA] mb-8 leading-relaxed">
                {condicoes}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {!revealed ? (
                  <button
                    onClick={() => setRevealed(true)}
                    className="flex-1 bg-white text-black font-black uppercase tracking-[1px] px-8 py-4 rounded-xl transition-all hover:bg-[#AAFF00] active:scale-95 text-center"
                  >
                    REVELAR CUPOM
                  </button>
                ) : (
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white/5 border border-dashed border-[#AAFF00]/40 rounded-xl px-6 py-4 flex items-center justify-between group">
                      <span className="font-mono font-bold text-[#AAFF00] text-xl">{cupom}</span>
                      <button 
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                        title="Copiar cupom"
                      >
                        {copied ? <Check className="w-5 h-5 text-[#AAFF00]" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <a
                      href={whatsappLink}
                      onClick={() => trackWhatsappClick('Promo Namorados')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white font-black uppercase tracking-[1px] px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      ENVIAR WHATSAPP
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
