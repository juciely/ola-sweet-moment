import { supabase } from './src/lib/supabase';

const seoData = [
  { chave: 'seo_title_home', valor: 'Elite+ Performance | Melhor Academia de Alta Performance em Sinop-MT' },
  { chave: 'seo_description_home', valor: 'A Elite+ Performance (Ex-Agitare São Cristóvão) é a melhor academia de Sinop-MT. Estrutura premium, professores certificados e foco em resultados reais. Agende sua visita!' },
  { chave: 'seo_keywords', valor: 'academia sinop, elite performance sinop, musculação sinop mt, agitare são cristóvão, treino funcional sinop, melhor academia sinop' },
  { chave: 'seo_local_name', valor: 'Elite+ Performance Performance' },
  { chave: 'seo_local_address', valor: 'Av. dos Jacarandás, 3445' },
  { chave: 'seo_local_neighborhood', valor: 'São Cristóvão' },
  { chave: 'seo_local_city', valor: 'Sinop' },
  { chave: 'seo_local_state', valor: 'MT' },
  { chave: 'seo_local_zip', valor: '78550-000' },
  { chave: 'seo_local_phone', valor: '(66) 99997-0103' },
  { chave: 'seo_local_latitude', valor: '-11.8647' },
  { chave: 'seo_local_longitude', valor: '-55.5056' },
  { chave: 'seo_google_business_url', valor: 'https://maps.app.goo.gl/ElitePlusSinop' },
  { chave: 'seo_title_agendar', valor: 'Agendar Visita Gratuita | Elite+ Performance Sinop-MT' },
  { chave: 'seo_description_agendar', valor: 'Quer conhecer a melhor estrutura de Sinop? Agende uma visita gratuita na Elite+ Performance e descubra como elevar seu padrão de treino.' }
];

async function fillSEO() {
  console.log('Preenchendo dados de SEO...');
  const { error } = await supabase.from('site_config').upsert(seoData, { onConflict: 'chave' });
  
  if (error) {
    console.error('Erro ao preencher SEO:', error);
    process.exit(1);
  }
  
  console.log('Dados de SEO preenchidos com sucesso!');
  process.exit(0);
}

fillSEO();
