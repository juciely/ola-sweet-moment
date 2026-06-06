import { supabase } from './src/lib/supabase';

async function resetAdminSetup() {
  console.log('Resetando configuração de setup do admin...');
  
  const { error } = await supabase
    .from('site_config')
    .upsert({
      chave: 'admin_setup_completed',
      valor: 'false'
    }, { onConflict: 'chave' });
  
  if (error) {
    console.error('Erro ao resetar setup:', error);
    process.exit(1);
  }
  
  console.log('Setup resetado com sucesso! A página de cadastro será exibida no próximo acesso ao /admin.');
  process.exit(0);
}

resetAdminSetup();
