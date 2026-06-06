import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePlanos } from '@/hooks/usePlanos';
import { useTracking } from '@/hooks/useTracking';

export function LeadForm() {
  const { planos } = usePlanos();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { trackLeadForm, getUtms, trackButtonClick } = useTracking();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const utms = getUtms();
    const plano = formData.get('plano') as string;
    const data = {
      nome: formData.get('nome') as string,
      whatsapp: formData.get('whatsapp') as string,
      plano_interesse: plano,
      origem: 'landing_page',
      pagina_origem: window.location.href,
      ...utms
    };

    try {
      const { data: leadData, error: insertError } = await supabase.from('leads').insert([data]).select();
      if (insertError) throw insertError;
      
      if (leadData && leadData[0]) {
        trackLeadForm(leadData[0].id, plano);
      }
      setSuccess(true);
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#080808] py-32 px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d7f803]/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-[700px] mx-auto text-center reveal">
          <span className="text-[#d7f803] font-poppins text-[12px] font-black uppercase tracking-[4px] mb-4 block">CONTATO</span>
          <h2 className="font-poppins font-black text-[36px] md:text-[60px] text-white mb-6 leading-[1.1]">
            QUER SABER QUAL <br />
            <span className="text-[#d7f803]">PLANO É PRA VOCÊ?</span>
          </h2>
          <p className="font-inter text-[16px] md:text-[18px] text-[#666] mb-12 max-w-[500px] mx-auto font-light">
            Deixe seu contato. Nossa equipe entrará em contato em menos de 1 hora para tirar todas as suas dúvidas.
          </p>

          {success ? (
            <div className="bg-[#111] border border-[#d7f803]/30 p-12 rounded-[32px] animate-fade-in shadow-2xl backdrop-blur-md">
              <div className="w-20 h-20 bg-[#d7f803] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(215,248,3,0.3)]">
                <svg className="w-10 h-10 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-bebas text-3xl mb-2">PERFEITO!</p>
              <p className="text-[#888] font-inter">Recebemos seus dados. Em breve nossa equipe entrará em contato.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-[500px] mx-auto">
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  required
                  className="w-full bg-[#111] border border-white/5 text-white px-7 py-5 rounded-[20px] outline-none focus:border-[#d7f803]/50 focus:ring-4 focus:ring-[#d7f803]/5 transition-all placeholder-[#444] font-inter font-medium"
                />
                
                <input
                  name="whatsapp"
                  type="tel"
                  placeholder="WhatsApp (66) 9 9999-9999"
                  required
                  className="w-full bg-[#111] border border-white/5 text-white px-7 py-5 rounded-[20px] outline-none focus:border-[#d7f803]/50 focus:ring-4 focus:ring-[#d7f803]/5 transition-all placeholder-[#444] font-inter font-medium"
                />

                <div className="relative">
                  <select
                    name="plano"
                    className="w-full bg-[#111] border border-white/5 text-white px-7 py-5 rounded-[20px] outline-none focus:border-[#d7f803]/50 focus:ring-4 focus:ring-[#d7f803]/5 transition-all appearance-none font-inter font-medium cursor-pointer"
                  >
                    <option value="">Qual o seu objetivo?</option>
                    <option value="perda_peso">Perda de peso</option>
                    <option value="ganho_massa">Ganho de massa</option>
                    <option value="condicionamento">Condicionamento físico</option>
                    <option value="saude">Saúde e bem-estar</option>
                  </select>
                  <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-inter text-center mt-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                onClick={() => trackButtonClick('Solicitar Contato Form', 'LeadForm')}
                className="w-full bg-[#d7f803] text-[#0A0A0A] font-black uppercase tracking-[2px] py-5 rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(215,248,3,0.3)] disabled:opacity-50 text-[17px] mt-4 shadow-xl active:scale-95"
              >
                {loading ? 'ENVIANDO...' : 'SOLICITAR CONTATO'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
