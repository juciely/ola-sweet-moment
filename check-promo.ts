import { supabase } from './src/lib/supabase';

async function checkPromoConfig() {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .ilike('chave', 'promocao%');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Promo Config in DB:');
  console.table(data);
}

checkPromoConfig();
