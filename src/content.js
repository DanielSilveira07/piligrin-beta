const content = {
  meta: {
    title: "Piligrin | Marketing de Vendas",
    description:
      "Transformando esforço em vendas através de marketing de performance para vendedores de marketplace.",
    url: "https://piligrin.vercel.app/",
    image: "/img/logo/logo-horizontal-branca.png",
  },
  navigation: {
    logoHorizontal: "/img/logo/logo-horizontal-branca.png",
    logoSolo: "/img/logo/logo-solo-branca.png",
    links: [
      { href: "#hero",    label: "Início" },
      { href: "#pilares", label: "O Sistema" },
      { href: "#dores",   label: "Diagnóstico" },
      { href: "#cases",   label: "Cases" },
      { href: "#oferta",  label: "Agendar" },
    ],
  },
  footer: {
    description:
      "Transformando esforço em vendas através de marketing de performance.",
    ctaTitle: "Pronto para crescer?",
    ctaText: "Agende sua sessão de aceleração gratuita agora.",
    ctaButton: "Agendar Sessão",
    privacyLinkLabel: "Política de Privacidade",
    copyright: "© 2025 Piligrin. Todos os direitos reservados.",
    instagramUrl: "https://www.instagram.com/_piligrin_/",
  },
  privacyPolicy: {
    title: "Política Privacidade",
    siteUrl: "https://piligrin.com.br/",
    privacyReferenceUrl: "https://politicaprivacidade.com/",
    intro:
      "A sua privacidade é importante para nós. É política do Piligrin respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site",
    introSuffix: ", e outros sites que possuímos e operamos.",
    collection:
      "Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.",
    retention:
      "Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.",
    sharing:
      "Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.",
    externalLinks:
      "O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.",
    refusal:
      "Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.",
    continuation:
      "O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.",
    advertisingNotes: [
      "O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.",
      "Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.",
      "Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.",
      "Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.",
    ],
    commitmentTitle: "Compromisso do Usuário",
    commitments: [
      "A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;",
      "B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;",
      "C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Piligrin, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.",
    ],
    moreInfoTitle: "Mais informações",
    moreInfoText:
      "Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.",
    effectiveDate: "14 November 2025 19:30",
  },
  leadModal: {
    title: "Agende sua Sessão",
    highlight: "Gratuita",
    subtitle: "Preencha seus dados e nossa equipe entrará em contato em breve",
    fields: [
      { name: "nome", label: "Nome completo", type: "text", required: true },
      { name: "email", label: "E-mail", type: "email", required: true },
      { name: "telefone", label: "Telefone/WhatsApp", type: "tel", required: true },
      { name: "empresa", label: "Nome da empresa", type: "text", required: true },
      {
        name: "segmento",
        label: "Segmento",
        type: "text",
        placeholder: "Ex: Moda, Eletrônicos, Alimentação...",
        required: true,
      },
    ],
    faturamentoOptions: [
      "Até R$ 10.000",
      "R$ 10.000 - R$ 50.000",
      "R$ 50.000 - R$ 100.000",
      "R$ 100.000 - R$ 500.000",
      "Acima de R$ 500.000",
    ],
    buttonText: "Quero Acelerar Minhas Vendas",
    disclaimer: "🔒 Seus dados estão seguros e não serão compartilhados",
    privacyLinkLabel: "Política de Privacidade",
  },
};

export default content;
