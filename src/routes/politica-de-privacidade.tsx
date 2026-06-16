import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Elite+ Performance Sinop-MT" },
      {
        name: "description",
        content:
          "Política de Privacidade da Elite+ Performance: como coletamos, usamos, armazenamos e protegemos seus dados pessoais conforme a LGPD e diretrizes de Google Ads e Meta Ads.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Política de Privacidade | Elite+ Performance" },
      {
        property: "og:description",
        content:
          "Saiba como tratamos seus dados pessoais em conformidade com a LGPD e as políticas de Google e Meta.",
      },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
  component: PoliticaPrivacidade,
});

function PoliticaPrivacidade() {
  const ultimaAtualizacao = "16 de junho de 2026";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Voltar para o início</Link>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Última atualização: {ultimaAtualizacao}
          </p>
        </header>

        <article className="prose prose-neutral max-w-none space-y-8 text-[15px] leading-relaxed dark:prose-invert">
          <section>
            <h2 className="text-xl font-semibold">1. Quem somos</h2>
            <p>
              A <strong>Elite+ Performance</strong> (anteriormente Agitare São
              Cristóvão), inscrita no endereço Av. dos Jacarandás, 3445, Bairro
              São Cristóvão, Sinop-MT, CEP 78550-000, é a controladora dos dados
              pessoais tratados por meio deste site, das nossas campanhas
              publicitárias e dos canais de atendimento (WhatsApp, telefone e
              presencial). Para falar com nosso encarregado de proteção de
              dados (DPO), envie um e-mail para{" "}
              <strong>privacidade@eliteperformance.com.br</strong> ou ligue para{" "}
              <strong>(66) 99997-0103</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. A que esta política se aplica</h2>
            <p>
              Esta política se aplica a qualquer pessoa que interaja conosco,
              independente da origem do acesso, incluindo:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Visitantes vindos de anúncios pagos no <strong>Google Ads</strong> (Pesquisa, Display, YouTube, Performance Max);</li>
              <li>Visitantes vindos de anúncios pagos na <strong>Meta</strong> (Facebook, Instagram, Messenger, WhatsApp Ads);</li>
              <li>Visitantes vindos de tráfego <strong>orgânico</strong> (SEO, redes sociais não pagas);</li>
              <li>Visitantes vindos de <strong>tráfego direto</strong>, indicação ou QR Code;</li>
              <li>Usuários que nos encontraram pelo <strong>Google Maps</strong> ou Google Meu Negócio;</li>
              <li>Leads, alunos matriculados, ex-alunos e prospects em geral.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Quais dados coletamos</h2>
            <p>Coletamos apenas o necessário para cumprir as finalidades descritas nesta política:</p>
            <h3 className="mt-4 font-semibold">3.1. Dados fornecidos por você</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>Nome completo;</li>
              <li>Telefone / WhatsApp;</li>
              <li>E-mail (quando informado);</li>
              <li>Plano de interesse e mensagens enviadas pelos formulários ou WhatsApp;</li>
              <li>Data e horário preferidos para visita ou aula experimental.</li>
            </ul>

            <h3 className="mt-4 font-semibold">3.2. Dados coletados automaticamente</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>Endereço IP, tipo de dispositivo, navegador e sistema operacional;</li>
              <li>Páginas visitadas, tempo de permanência e cliques em botões;</li>
              <li>Parâmetros de campanha (UTMs: <em>utm_source</em>, <em>utm_medium</em>, <em>utm_campaign</em>, <em>utm_content</em>, <em>utm_term</em>);</li>
              <li>Identificadores de cookies, pixels e SDKs publicitários (Meta Pixel, Google Tag/Ads, Google Analytics 4).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Consentimento expresso para uso publicitário</h2>
            <p className="rounded-md border border-primary/30 bg-primary/5 p-4">
              Ao preencher qualquer formulário do site, clicar em botões de
              contato (WhatsApp, "Quero me matricular", "Agendar visita") ou
              aceitar o aviso de cookies, <strong>você declara, de forma livre,
              informada e inequívoca, que autoriza a Elite+ Performance a
              utilizar seus dados pessoais</strong> (nome, telefone, e-mail,
              identificadores de dispositivo e dados de navegação) para as
              seguintes finalidades:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Realizar <strong>contato comercial</strong> por telefone, WhatsApp, SMS e e-mail;</li>
              <li>Enviar comunicações de <strong>marketing</strong>, ofertas, promoções e novidades;</li>
              <li>Executar <strong>campanhas de reativação</strong> de leads e ex-alunos;</li>
              <li>Criar <strong>públicos personalizados e semelhantes (lookalike)</strong> no Google Ads e Meta Ads;</li>
              <li>Realizar <strong>remarketing / retargeting</strong> em plataformas como Google, YouTube, Facebook e Instagram;</li>
              <li>Mensurar <strong>conversões offline e online</strong> (Conversions API da Meta e Enhanced Conversions do Google);</li>
              <li>Analisar performance de campanhas e otimizar nossos anúncios;</li>
              <li>Cumprir obrigações contratuais, fiscais e legais.</li>
            </ul>
            <p className="mt-3">
              Você pode <strong>revogar este consentimento a qualquer momento</strong>,
              sem custo, conforme item 9 desta política.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Bases legais (LGPD)</h2>
            <p>
              Tratamos seus dados com base nas hipóteses do art. 7º da Lei Geral
              de Proteção de Dados (Lei nº 13.709/2018):
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Consentimento</strong> (art. 7º, I) — para marketing, remarketing e públicos publicitários;</li>
              <li><strong>Execução de contrato</strong> (art. 7º, V) — para matrícula, agendamentos e atendimento;</li>
              <li><strong>Cumprimento de obrigação legal</strong> (art. 7º, II) — fiscal, tributária e regulatória;</li>
              <li><strong>Legítimo interesse</strong> (art. 7º, IX) — segurança, prevenção a fraudes e melhoria do site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Compartilhamento com terceiros</h2>
            <p>
              Não vendemos seus dados. Compartilhamos apenas com operadores
              necessários para a execução dos serviços e campanhas:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Google LLC</strong> — Google Ads, Google Analytics 4, Google Tag Manager, Google Maps e Google Meu Negócio (<a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">política</a>);</li>
              <li><strong>Meta Platforms, Inc.</strong> — Facebook Ads, Instagram Ads, Meta Pixel e Conversions API (<a className="underline" href="https://www.facebook.com/privacy/policy" target="_blank" rel="noreferrer">política</a>);</li>
              <li><strong>WhatsApp / Meta</strong> — atendimento via WhatsApp Business;</li>
              <li>Provedores de hospedagem, banco de dados, e-mail marketing e CRM contratados sob acordo de confidencialidade;</li>
              <li>Autoridades públicas, quando exigido por lei ou ordem judicial.</li>
            </ul>
            <p>
              Alguns desses parceiros podem realizar <strong>transferência
              internacional de dados</strong> (ex.: servidores nos EUA). Tais
              transferências seguem as garantias previstas no art. 33 da LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Cookies e tecnologias de rastreamento</h2>
            <p>Utilizamos cookies próprios e de terceiros para:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li><strong>Essenciais</strong>: manter o site funcionando (não podem ser desativados);</li>
              <li><strong>Analíticos</strong>: entender como você navega (Google Analytics 4);</li>
              <li><strong>Publicitários</strong>: personalizar anúncios e medir conversões (Meta Pixel, Google Ads);</li>
              <li><strong>Funcionais</strong>: lembrar suas preferências e UTMs de origem.</li>
            </ul>
            <p>
              Você pode gerenciar cookies nas configurações do seu navegador. A
              desativação de cookies publicitários pode afetar a relevância dos
              anúncios, mas não impede o uso do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Armazenamento e segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus
              dados, incluindo criptografia em trânsito (HTTPS/TLS), controle
              de acesso por perfis, autenticação forte no painel administrativo
              e backups regulares. Os dados são armazenados pelo tempo
              necessário às finalidades desta política ou pelo prazo exigido
              por lei (ex.: 5 anos para dados fiscais).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Seus direitos como titular</h2>
            <p>Conforme o art. 18 da LGPD, você pode, a qualquer momento, solicitar:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos seus dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade a outro fornecedor;</li>
              <li>Eliminação dos dados tratados com base em consentimento;</li>
              <li>Informação sobre com quem compartilhamos seus dados;</li>
              <li><strong>Revogação do consentimento</strong> e descadastro de comunicações;</li>
              <li>Oposição a tratamento que considere irregular.</li>
            </ul>
            <p>
              Basta enviar a solicitação para{" "}
              <strong>privacidade@eliteperformance.com.br</strong>. Respondemos
              em até 15 dias.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10. Crianças e adolescentes</h2>
            <p>
              Para menores de 18 anos, os dados são tratados mediante
              autorização do responsável legal, especialmente para matrícula no
              Espaço Kids e atividades infantis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11. Conformidade com Google e Meta</h2>
            <p>
              Esta política observa as exigências das plataformas onde
              anunciamos, incluindo a{" "}
              <a className="underline" href="https://support.google.com/adspolicy/answer/54817" target="_blank" rel="noreferrer">
                Política de Publicidade Personalizada do Google
              </a>{" "}
              e os{" "}
              <a className="underline" href="https://www.facebook.com/legal/terms/businesstools" target="_blank" rel="noreferrer">
                Termos de Ferramentas de Negócios da Meta
              </a>
              . Não tratamos categorias sensíveis de dados para fins
              publicitários sem consentimento específico.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">12. Alterações nesta política</h2>
            <p>
              Podemos atualizar este documento periodicamente. A data da última
              atualização está sempre indicada no topo. Mudanças relevantes
              serão comunicadas pelos nossos canais oficiais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">13. Contato e Autoridade Nacional</h2>
            <p>
              Se entender que seus direitos não foram atendidos, você pode
              contatar a Autoridade Nacional de Proteção de Dados (ANPD) pelo
              site{" "}
              <a className="underline" href="https://www.gov.br/anpd" target="_blank" rel="noreferrer">
                gov.br/anpd
              </a>
              .
            </p>
          </section>
        </article>

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          Elite+ Performance © {new Date().getFullYear()} — Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
}
