import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePlanos } from '@/hooks/usePlanos';

export function LeadForm() {
  const { planos } = usePlanos();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get('nome') as string,
      whatsapp: formData.get('whatsapp') as string,
      plano_interesse: formData.get('plano') as string,
      origem: 'landing_page'
    };

    try {
      const { error: insertError } = await supabase.from('leads').insert([data]);
      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#080808] py-24 px-6 border-t border-white/5">
      <div className="max-w-[600px] mx-auto text-center reveal">
        <h2 className="font-bebas text-[52px] text-white mb-2">
          QUER SABER QUAL PLANO É PRA VOCÊ?
        </h2>
        <p className="font-inter text-base text-[#666] mb-12">
          Deixa seu contato. A gente te responde em menos de 1 hora.
        </p>

        {success ? (
          <div className="bg-[#111] border border-[#AAFF00] p-10 rounded-[16px] animate-fade-in shadow-[0_0_32px_rgba(170,255,0,0.08)]">
            <p className="text-[#AAFF00] font-bold text-xl">Perfeito! Recebemos seus dados.</p>
            <p className="text-[#888] mt-2">Em breve nossa equipe entrará em contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              name="nome"
              type="text"
              placeholder="Seu nome"
              required
              className="w-full bg-[#111] border border-[#222] text-white px-6 py-4 rounded-[12px] outline-none focus:border-[#AAFF00] focus:ring-4 focus:ring-[#AAFF00]/10 transition-all placeholder-[#444]"
            />
            
            <input
              name="whatsapp"
              type="tel"
              placeholder="WhatsApp (66) 9 9999-9999"
              required
              className="w-full bg-[#111] border border-[#222] text-white px-6 py-4 rounded-[12px] outline-none focus:border-[#AAFF00] focus:ring-4 focus:ring-[#AAFF00]/10 transition-all placeholder-[#444]"
            />

            <div className="relative">
              <select
                name="plano"
                className="w-full bg-[#111] border border-[#222] text-white px-6 py-4 rounded-[12px] outline-none focus:border-[#AAFF00] focus:ring-4 focus:ring-[#AAFF00]/10 transition-all appearance-none"
              >
                <option value="">Plano de interesse</option>
                {planos.map(p => (
                  <option key={p.id} value={p.nome}>{p.nome}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">↓</div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#AAFF00] text-[#0A0A0A] font-extrabold uppercase tracking-[1px] py-5 rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(170,255,0,0.35)] disabled:opacity-50 text-[17px]"
              style={{ boxShadow: '0 0 40px rgba(170,255,0,0.35)' }}
            >
              {loading ? 'ENVIANDO...' : 'ENVIAR AGORA'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
