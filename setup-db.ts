
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Carrega variáveis do .env se existir
config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Erro: VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessários.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function setupDatabase() {
  console.log('Iniciando configuração do banco de dados...')

  const sql = `
    -- Tabela site_config
    CREATE TABLE IF NOT EXISTS site_config (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        chave text UNIQUE NOT NULL,
        valor text,
        created_at timestamptz DEFAULT now()
    );

    -- Tabela planos
    CREATE TABLE IF NOT EXISTS planos (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        nome text NOT NULL,
        duracao text NOT NULL,
        preco numeric NOT NULL,
        destaque boolean DEFAULT false,
        ativo boolean DEFAULT true,
        ordem integer DEFAULT 0,
        created_at timestamptz DEFAULT now()
    );

    -- Tabela leads
    CREATE TABLE IF NOT EXISTS leads (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        nome text,
        whatsapp text,
        plano_interesse text,
        origem text DEFAULT 'landing_page',
        created_at timestamptz DEFAULT now()
    );

    -- Inserir dados iniciais site_config
    INSERT INTO site_config (chave, valor) VALUES
    ('hero_titulo', 'Mudamos o Nome. Elevamos o Padrão.'),
    ('hero_subtitulo', 'Agitare agora é Elite+ Performance. Seu próximo nível começa aqui.'),
    ('hero_cta', 'Quero Começar Agora'),
    ('oferta_badge', 'REINAUGURAÇÃO — OFERTA POR TEMPO LIMITADO'),
    ('oferta_titulo', 'Plano Anual Recorrente'),
    ('oferta_preco', '119,90'),
    ('oferta_preco_riscado', '160,00'),
    ('oferta_descricao', 'Primeira mensalidade com desconto especial de reinauguração. Contrato anual. Cancele quando quiser.'),
    ('whatsapp_numero', '5566999970103'),
    ('whatsapp_mensagem', 'Olá! Vi a oferta de reinauguração e quero saber mais sobre o Plano Anual Recorrente.'),
    ('endereco', 'Rua Colonizador Ênio Pipino, 565 — Menino Jesus II, Sinop-MT'),
    ('horario_semana', 'Segunda a Sexta: 05h00 às 22h00'),
    ('horario_sabado', 'Sábado: 05h30 às 08h30 e 15h00 às 18h00'),
    ('horario_feriado', 'Feriados: 07h00 às 11h00')
    ON CONFLICT (chave) DO UPDATE SET valor = EXCLUDED.valor;

    -- Inserir dados iniciais planos
    INSERT INTO planos (ordem, nome, duracao, preco, destaque, ativo) VALUES
    (1, 'Diário', '1 dia', 35.00, false, true),
    (2, 'Semanal', '1 semana', 80.00, false, true),
    (3, 'Quinzenal', '15 dias', 90.00, false, true),
    (4, 'Mensal', '1 mês', 160.00, false, true),
    (5, 'Dupla', '1 mês', 140.00, false, true),
    (6, 'Trimestral', '3 meses', 360.00, false, true),
    (7, 'Semestral', '6 meses', 660.00, false, true),
    (8, 'Anual', '12 meses', 1140.00, false, true),
    (9, 'Anual Recorrente', '12 meses', 119.90, true, true);

    -- Habilitar RLS
    ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
    ALTER TABLE planos ENABLE ROW LEVEL SECURITY;
    ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

    -- Políticas site_config
    DROP POLICY IF EXISTS "Allow public select on site_config" ON site_config;
    CREATE POLICY "Allow public select on site_config" ON site_config FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow authenticated all on site_config" ON site_config;
    CREATE POLICY "Allow authenticated all on site_config" ON site_config FOR ALL TO authenticated USING (true);

    -- Políticas planos
    DROP POLICY IF EXISTS "Allow public select on planos" ON planos;
    CREATE POLICY "Allow public select on planos" ON planos FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Allow authenticated all on planos" ON planos;
    CREATE POLICY "Allow authenticated all on planos" ON planos FOR ALL TO authenticated USING (true);

    -- Políticas leads
    DROP POLICY IF EXISTS "Allow public insert on leads" ON leads;
    CREATE POLICY "Allow public insert on leads" ON leads FOR INSERT WITH CHECK (true);
    DROP POLICY IF EXISTS "Allow authenticated all on leads" ON leads;
    CREATE POLICY "Allow authenticated all on leads" ON leads FOR ALL TO authenticated USING (true);
  `

  const { error } = await supabase.rpc('exec_sql', { sql_query: sql })

  if (error) {
    if (error.message.includes('function "exec_sql" does not exist')) {
        console.error('Erro: A função "exec_sql" não existe no Supabase. Como não tenho acesso direto ao SQL Editor, por favor, execute o script SQL manualmente no painel do Supabase.')
    } else {
        console.error('Erro ao executar SQL:', error)
    }
  } else {
    console.log('Banco de dados configurado com sucesso!')
  }
}

setupDatabase()
