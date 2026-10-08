// Configurações Globais do Painel de LED
// Você pode alterar os valores abaixo para personalizar o site com os dados da sua cidade e do seu painel!

const CONFIG = {
  // Informações do Proprietário / Empresa
  empresa: {
    nome: "3M Marketing",
    slogan: "Sua marca em alta definição no ponto mais nobre da cidade",
    whatsapp: "5532987128882", // WhatsApp comercial: DDD 32 + número 98712-8882 (com prefixo 55)
    email: "comercial@megaledmidia.com.br",
    cidade: "Muriaé - MG",
    pontoReferencia: "Praça João Pinheiro, Bairro Centro, Muriaé, Minas Gerais",
    pontoReferenciaDetalhe: "Em frente ao Relógio da Praça"
  },

  // Especificações Técnicas do Painel
  especificacoes: {
    tipo: "Painel de LED Outdoor P3 Full Color",
    resolucao: "1920 x 1080 pixels (Full HD - Proporção 16:9)",
    dimensao: "6m x 3m (18m² de área de exibição)",
    duracaoInsercao: "10 a 15 segundos",
    horarioFuncionamento: "06:00 às 00:00 (18 horas diárias de impacto)",
    brilho: "6.500 nits (Visibilidade total mesmo sob sol direto do meio-dia)"
  },

  // Métricas e Estatísticas de Tráfego do Local
  metricas: {
    impactosDiarios: "52.000+",
    veiculosDia: "34.000",
    pedestresDia: "18.000",
    tempoParadaSemaforo: "60 segundos",
    alcanceMensal: "1.560.000+ visualizações estimadas"
  },

  // Coordenadas para o Mapa (Praça João Pinheiro, Relógio da Praça - Muriaé/MG)
  mapa: {
    lat: -21.13154,
    lng: -42.36289,
    zoom: 18
  },

  // Planos de Exibição: Mensal (R$ 900), Semestral (10% OFF = R$ 810/mês), Anual (20% OFF = R$ 720/mês)
  planos: [
    {
      id: "mensal",
      nome: "Plano Mensal",
      badge: "1 Mês",
      destaque: false,
      meses: 1,
      dias: 30,
      descontoPercentual: 0,
      precoMensal: 900.00,
      precoSemDesconto: 900.00,
      precoTotal: 900.00,
      economiaTotal: 0.00,
      insercoesDia: 300,
      descricao: "Ideal para campanhas pontuais e empresas que desejam testar o impacto no Centro de Muriaé.",
      recursos: [
        "300 inserções de 15s por dia (9.000/mês)",
        "Exibição contínua das 06:00 às 00:00",
        "Troca de artes ilimitada",
        "Relatório mensal de exibição",
        "Suporte comercial direto no WhatsApp"
      ]
    },
    {
      id: "semestral",
      nome: "Plano Semestral",
      badge: "Mais Escolhido • 10% OFF",
      destaque: true, // Mais vendido
      meses: 6,
      dias: 180,
      descontoPercentual: 10,
      precoMensal: 810.00, // De R$ 900 por R$ 810/mês
      precoSemDesconto: 5400.00, // 6 x 900
      precoTotal: 4860.00, // 6 x 810
      economiaTotal: 540.00, // Economia de R$ 540
      insercoesDia: 300,
      descricao: "Consolide sua marca na mente de Muriaé com 10% de desconto garantido durante 6 meses.",
      recursos: [
        "300 inserções de 15s por dia (54.000 total)",
        "Mensalidade com 10% OFF: R$ 810,00/mês",
        "Economia total de R$ 540,00 no contrato",
        "Troca de artes ilimitada",
        "Relatório periódico de veiculação"
      ]
    },
    {
      id: "anual",
      nome: "Plano Anual",
      badge: "Maior Economia • 20% OFF",
      destaque: false,
      meses: 12,
      dias: 365,
      descontoPercentual: 20,
      precoMensal: 720.00, // De R$ 900 por R$ 720/mês
      precoSemDesconto: 10800.00, // 12 x 900
      precoTotal: 8640.00, // 12 x 720
      economiaTotal: 2160.00, // Economia de R$ 2.160
      insercoesDia: 300,
      descricao: "Presença absoluta na Praça João Pinheiro o ano inteiro com a menor tarifa mensal (20% OFF).",
      recursos: [
        "300 inserções de 15s por dia (109.500 total)",
        "Mensalidade com 20% OFF: R$ 720,00/mês",
        "Economia gigantesca de R$ 2.160,00 no ano",
        "Troca de artes e promoções ilimitadas"
      ]
    }
  ],

  // ============================================================
  // PAGAMENTO ONLINE
  // ------------------------------------------------------------
  // 1) PIX (direto na sua conta, sem taxa):
  //    O site gera um QR Code Pix REAL e válido (padrão do Banco
  //    Central). O cliente paga o valor exato do plano e o dinheiro
  //    cai direto na chave abaixo. Chave de celular sempre no
  //    formato +55 + DDD + número.
  chavePix: "+5532987128882",

  // 2) CARTÃO (InfinitePay com "Repassando taxas"):
  //    Crie 6 links no app InfinitePay (Vender > Link de Pagamento)
  //    com a opção "Repassando taxas" ATIVADA. Assim o cliente paga
  //    o plano + taxa e você recebe 100% do valor do plano.
  //    Cole cada endereço abaixo (ex: "https://pay.infinitepay.app/xxxx").
  //    Enquanto um link estiver vazio, o site orienta a finalizar
  //    pelo WhatsApp — o fluxo nunca quebra.
  cartao: {
    gateway: "InfinitePay",
    valorCriacaoArte: 150.00, // taxa única da criação de arte
    // Links criados no app InfinitePay com "Repassando taxas" ativado
    links: {
      mensal: {
        semArte: "https://link.infinitepay.io/marcosvinicyus/VC1D-eFaJbHSv92-900,00",
        comArte: "https://link.infinitepay.io/marcosvinicyus/VC1D-NmPy44C8yI-1050,00"
      },
      semestral: {
        semArte: "https://link.infinitepay.io/marcosvinicyus/VC1D-gbZzRMSygH-4860,00",
        comArte: "https://link.infinitepay.io/marcosvinicyus/VC1D-lwXoYgdH9a-5010,00"
      },
      anual: {
        semArte: "https://link.infinitepay.io/marcosvinicyus/VC1D-ylsk7yswXK-8640,00",
        comArte: "https://link.infinitepay.io/marcosvinicyus/VC1D-uPd5fGNgtG-8790,00"
      }
    }
  },

  // Exemplos de Artes para o Simulador
  // Os 12 ramos abaixo foram escolhidos com base nos seguimentos com maior
  // número de empresas abertas em Muriaé - MG (Zona da Mata Mineira),
  // onde fica o painel da Praça João Pinheiro.
  artesExemplo: [
    {
      nome: "Restaurantes, Lanchonetes e Pizzarias",
      categoria: "Alimentação",
      corFundo: "#7f1d1d",
      titulo: "PIZZARIA & RESTAURANTE",
      subtitulo: "Almoço executivo, rodízio e delivery",
      badge: "PROMOÇÃO DA SEMANA",
      icone: "utensils"
    },
    {
      nome: "Lojas de Roupas, Tênis e Boutique",
      categoria: "Moda",
      corFundo: "#4c1d95",
      titulo: "MODA & CALÇADOS",
      subtitulo: "Coleção outono/inverno com estilo para todos",
      badge: "ATÉ 50% OFF",
      icone: "shirt"
    },
    {
      nome: "Barbearias, Salões e Studios de Unha",
      categoria: "Beleza",
      corFundo: "#831843",
      titulo: "BARBEARIA & SALÃO",
      subtitulo: "Corte, barba, progressiva e manicure",
      badge: "CUPOM NA PRIMEIRA VISITA",
      icone: "scissors"
    },
    {
      nome: "Clínicas, Consultórios e Laboratórios",
      categoria: "Saúde",
      corFundo: "#155e75",
      titulo: "CLÍNICA ODONTO PREMIUM",
      subtitulo: "Implantes e alinhadores em até 24x",
      badge: "AGENDE SUA AVALIAÇÃO",
      icone: "heart-pulse"
    },
    {
      nome: "Farmácias, Drogaris e Perfumarias",
      categoria: "Farmácia",
      corFundo: "#065f46",
      titulo: "FARMÁCIA 24 HORAS",
      subtitulo: "Remédios, higiene e perfumaria com desconto",
      badge: "FRETE GRÁTIS NA CIDADE",
      icone: "pill"
    },
    {
      nome: "Pet Shops e Clínicas Veterinárias",
      categoria: "Pet Shop",
      corFundo: "#0f766e",
      titulo: "PET SHOP & VETERINÁRIO",
      subtitulo: "Ração, banho e tosa,-castração e vacinas",
      badge: "BANHO E TOSA",
      icone: "paw-print"
    },
    {
      nome: "Materiais de Construção e Ferramentas",
      categoria: "Construção",
      corFundo: "#44403c",
      titulo: "MATERIAIS DE CONSTRUÇÃO",
      subtitulo: "Tinta, piso, material elétrico e ferramentas",
      badge: "PARCELA EM ATÉ 12X",
      icone: "hammer"
    },
    {
      nome: "Concessionárias, Seminovos e Lavagem",
      categoria: "Veículos",
      corFundo: "#1e40af",
      titulo: "MEGA FEIRÃO DE SEMINOVOS",
      subtitulo: "Taxa zero e primeira parcela para 2027",
      badge: "SÓ ESTE FIM DE SEMANA",
      icone: "car"
    },
    {
      nome: "Imobiliárias e Construtoras",
      categoria: "Imóveis",
      corFundo: "#3730a3",
      titulo: "NOVO RESIDENCIAL HORIZONTE",
      subtitulo: "2 e 3 quartos com varanda gourmet",
      badge: "LANÇAMENTO EXCLUSIVO",
      icone: "building-2"
    },
    {
      nome: "Móveis, Planejados e Decoração",
      categoria: "Móveis",
      corFundo: "#6b21a8",
      titulo: "MÓVEIS & DECORAÇÃO",
      subtitulo: "Sala, quarto, planejados e cortinas sob medida",
      badge: "ATÉ 40% OFF",
      icone: "sofa"
    },
    {
      nome: "Papelarias, Gráficas e Material de Escritório",
      categoria: "Papelaria",
      corFundo: "#7c2d12",
      titulo: "PAPELARIA & COPIADORA",
      subtitulo: "Material de escritório, impressão e plotagem",
      badge: "10% OFF NO PIX",
      icone: "printer"
    },
    {
      nome: "Colégios, Cursinhos e Cursos Técnicos",
      categoria: "Educação",
      corFundo: "#78350f",
      titulo: "CURSO TÉCNICO & CURSINHO",
      subtitulo: "Preparação para o ENEM e concursos públicos",
      badge: "TURMA 2027 ABERTA",
      icone: "graduation-cap"
    }
  ]
};
