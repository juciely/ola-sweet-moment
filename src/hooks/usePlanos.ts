import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Plano {
  id: string;
  nome: string;
  duracao: string;
  preco: number;
  destaque: boolean;
  ativo: boolean;
  ordem: number;
}

export function usePlanos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanos() {
      try {
        const { data, error } = await supabase
          .from('planos')
          .select('*')
          .eq('ativo', true)
          .order('ordem', { ascending: true });

        if (error) throw error;
        setPlanos(data || []);
      } catch (err) {
        console.error('Error fetching planos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanos();
  }, []);

  return { planos, loading };
}
