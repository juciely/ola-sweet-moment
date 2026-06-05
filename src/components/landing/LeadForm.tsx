import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { usePlanos } from '@/hooks/usePlanos';

export function LeadForm() {
  const { planos, loading: loadingPlanos } = usePlanos();
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

    if (!data.nome || !data.whatsapp) {
      setError('Por favor, preencha nome e WhatsApp.');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([data]);

      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('Ocorreu um erro ao enviar seus dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5">
      <div className="max-w-[600px] mx-auto text-center">
        <h2 className="font-bebas text-5xl md:text-6xl text-white mb-4">
          RECEBA NOSSA OFERTA NO WHATSAPP
        </h2>
        <p className="font-inter text-[#888888] mb-12">
          Deixa seu contato. A gente te manda a oferta completa.
        </p>

        {success ? (
          <div className="bg-[#111111] border border-[#AAFF00] p-8 rounded-[4px] animate-fade-in">
            <p className="text-[#AAFF00] font-bold text-lg">
              Perfeito! Em breve você recebe nossa oferta.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="text-[10px] uppercase tracking-[2px] text-[#555] font-bold">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome"
                required
                className="bg-[#111111] border border-[#222] text-white px-6 py-4 rounded-[4px] outline-none focus:border-[#AAFF00] transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="whatsapp" className="text-[10px] uppercase tracking-[2px] text-[#555] font-bold">WhatsApp</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="(66) 9 0000-0000"
                required
                className="bg-[#111111] border border-[#222] text-white px-6 py-4 rounded-[4px] outline-none focus:border-[#AAFF00] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="plano" className="text-[10px] uppercase tracking-[2px] text-[#555] font-bold">Plano de Interesse</label>
              <select
                id="plano"
                name="plano"
                className="bg-[#111111] border border-[#222] text-white px-6 py-4 rounded-[4px] outline-none focus:border-[#AAFF00] transition-colors appearance-none"
              >
                <option value="">Selecione um plano</option>
                {planos.map(plano => (
                  <option key={plano.id} value={plano.nome}>{plano.nome}</option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#AAFF00] text-[#0A0A0A] font-bold uppercase tracking-[1px] px-10 py-5 rounded-[4px] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? 'ENVIANDO...' : 'QUERO RECEBER A OFERTA'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
