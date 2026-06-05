import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type SiteConfig = {
  [key: string]: string;
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('chave, valor');

        if (error) throw error;

        const configMap = data.reduce((acc: SiteConfig, item) => {
          acc[item.chave] = item.valor;
          return acc;
        }, {});

        setConfig(configMap);
      } catch (err) {
        console.error('Error fetching site config:', err);
      } finally {
        setLoading(err => false);
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading };
}
