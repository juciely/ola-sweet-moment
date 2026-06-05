import { useState, useEffect } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTracking } from '@/hooks/useTracking';
import { Copy, Check, MessageCircle, Heart, Ticket, Timer } from 'lucide-react';

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    if (!targetDate) return;
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center px-3 md:px-5">
      <span className="font-bebas text-3xl md:text-5xl text-[#d7f803] leading-none">{value.toString().padStart(2, '0')}</span>
      <span className="font-poppins text-[8px] md:text-[10px] text-[#555] font-black uppercase tracking-widest mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center lg:justify-start gap-1 md:gap-2 mt-8 py-6 border-t border-white/5 bg-white/[0.02] rounded-b-[24px]">
      <div className="flex items-center gap-3 mr-4 hidden md:flex">
        <Timer className="w-5 h-5 text-[#d7f803] animate-pulse" />
        <span className="font-poppins text-[10px] text-white font-black uppercase tracking-[2px]">OFERTA EXPIRA EM:</span>
      </div>
      <TimeUnit value={timeLeft.days} label="Dias" />
      <div className="h-8 w-px bg-white/10 self-center"></div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="h-8 w-px bg-white/10 self-center"></div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="h-8 w-px bg-white/10 self-center"></div>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}


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
  const dataExpiracao = config.promocao_data_expiracao || '';
  const promocaoAtiva = config.promocao_ativa !== 'false';
  const whatsappLink = `https://wa.me/${config.whatsapp_numero || '5566999970103'}?text=${encodeURIComponent(`Olá! Gostaria de aproveitar a promoção de namorados. Cupom: ${cupom}`)}`;


  const copyToClipboard = () => {
    navigator.clipboard.writeText(cupom);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!promocaoAtiva) return null;

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#080808]">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-[#d7f803]/5 rounded-full blur-[140px] opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d7f803]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d7f803]/20 to-transparent"></div>
      </div>

      <div className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-[#111] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl transition-all hover:border-[#d7f803]/20 group">
            
            {/* Left Column: Visual & Pricing */}
            <div className="lg:w-[40%] bg-[#161616] p-12 flex flex-col items-center justify-center text-center relative border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="space-y-4 mb-8 flex flex-col items-center">
                <Ticket className="w-6 h-6 text-[#d7f803] mb-2" />
                <span className="font-poppins text-[10px] font-black text-[#d7f803] tracking-[4px] uppercase block">OFERTA ESPECIAL</span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-poppins font-black text-2xl text-white">R$</span>
                  <span className="font-poppins font-black text-[84px] md:text-[100px] leading-none text-white tracking-tighter">
                    {preco.split(',')[0]}<span className="text-[32px] md:text-[40px] text-[#d7f803]">,{preco.split(',')[1]}</span>
                  </span>
                </div>
                <p className="font-poppins text-[14px] text-[#555] font-bold uppercase tracking-widest">P/ PESSOA • 1º MÊS</p>
              </div>

              <div className="w-full h-px bg-white/5 mb-8"></div>

              <div className="space-y-4 w-full">
                <p className="font-poppins text-[11px] text-[#444] font-black uppercase tracking-[3px]">ACEITAMOS</p>
                <div className="flex justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all">
                  <img src="https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png" className="h-4 object-contain" alt="Visa" />
                  <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png" className="h-4 object-contain" alt="Mastercard" />
                  <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-4 object-contain" alt="PIX" />
                </div>
              </div>
            </div>

            {/* Right Column: Text & Actions */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#111] to-[#0D0D0D]">
              <div className="mb-8 text-center lg:text-left">
                <div className="inline-flex flex-col items-center lg:items-start gap-2 mb-6">
                  <Heart className="w-5 h-5 text-[#d7f803] mb-1" />
                  <div className="bg-[#d7f803]/10 text-[#d7f803] px-4 py-1.5 rounded-full border border-[#d7f803]/10">
                    <span className="font-poppins font-bold text-[9px] uppercase tracking-wider">{subtitulo}</span>
                  </div>
                </div>
                
                <h2 className="font-poppins font-extrabold text-[32px] md:text-[68px] text-white leading-[0.9] md:leading-[0.95] tracking-tighter uppercase mb-6 flex flex-col">
                  <span className="block">PROMOÇÃO</span>
                  <span className="text-[16px] md:text-[36px] text-[#666] font-medium tracking-[0.2em] md:tracking-widest mt-1 mb-1 block">JUNHO DOS</span>
                  <span className="text-[#d7f803] block">NAMORADOS</span>
                </h2>
                <p className="font-inter text-[15px] md:text-[17px] text-[#666] leading-relaxed max-w-[500px] mx-auto lg:mx-0">
                  {condicoes}
                </p>
              </div>

              <div className="mt-auto">
                {!revealed ? (
                  <button
                    onClick={() => setRevealed(true)}
                    className="w-full bg-white text-black font-poppins font-black uppercase tracking-[1px] px-8 py-5 rounded-full transition-all hover:bg-[#d7f803] hover:scale-105 active:scale-95 text-center shadow-[0_10px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
                  >
                    <Ticket className="w-5 h-5" />
                    REVELAR CUPOM
                  </button>
                ) : (
                  <div className="flex flex-col xl:flex-row gap-4 items-stretch animate-fade-up">
                    <div className="flex-[1.5] bg-white/5 border border-dashed border-[#d7f803]/30 rounded-2xl px-5 py-4 flex items-center justify-between group/cupom">
                      <div className="min-w-0">
                        <p className="text-[9px] text-[#444] font-black uppercase tracking-widest mb-0.5">CÓDIGO</p>
                        <span className="font-poppins font-black text-[#d7f803] text-lg md:text-xl tracking-tight truncate block">{cupom}</span>
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className="p-3 bg-white/5 hover:bg-[#d7f803] hover:text-black rounded-xl transition-all text-[#d7f803]"
                        title="Copiar cupom"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <a
                      href={whatsappLink}
                      onClick={() => trackWhatsappClick('Promo Namorados')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white font-poppins font-black uppercase tracking-[1px] px-8 py-5 rounded-2xl transition-all hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(37,211,102,0.3)] active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap"
                    >
                      <MessageCircle className="w-6 h-6 fill-current" />
                      EU QUERO
                    </a>
                  </div>
                )}
                
                {dataExpiracao && <CountdownTimer targetDate={dataExpiracao} />}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
