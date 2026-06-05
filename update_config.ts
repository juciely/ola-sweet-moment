import { supabase } from './src/lib/supabase.ts';

async function updateConfig() {
  const data = [
    { 
      chave: 'marquee_linha1', 
      valor: '⚡ REINAUGURAÇÃO OFICIAL  •  PLANO ANUAL POR R$119,90/MÊS  •  APP DE TREINO INCLUSO  •  PROFESSORES CREF  •  ESTACIONAMENTO GRÁTIS  ⚡' 
    },
    { 
      chave: 'marquee_linha2', 
      valor: '🔥 ESPAÇO KIDS  •  DUCHA COMPLETA  •  05H ÀS 22H  •  SEU PRÓXIMO NÍVEL COMEÇA AQUI  •  ELITE+ PERFORMANCE  •  SINOP-MT  🔥' 
    }
  ];

  for (const item of data) {
    const { error } = await supabase
      .from('site_config')
      .upsert(item, { onConflict: 'chave' });
    
    if (error) {
      console.error(`Error updating ${item.chave}:`, error);
    } else {
      console.log(`Successfully updated ${item.chave}`);
    }
  }
}

updateConfig();
