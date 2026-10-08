# 🚀 3M Marketing | Plataforma de Venda e Gestão de Publicidade em Painel de LED Outdoor

Este é um projeto completo, moderno e 100% interativo desenvolvido para divulgar o seu **Painel de LED Outdoor**, demonstrar os benefícios para comerciantes e marcas locais, permitir a simulação visual da arte e fechar contratações com pagamento online (Pix e Cartão) diretamente pelo site.

---

## 📂 Estrutura de Arquivos

```text
painel-led-outdoor/
├── index.html          # Página principal moderna e responsiva
├── css/
│   └── styles.css      # Estilos visuais, efeito realista de LED e malha de pixels P6
├── js/
│   ├── mockData.js     # Arquivo simples para você trocar cidade, preços, WhatsApp e endereço
│   └── app.js          # Lógica do simulador, calculadora de preços, calendário e checkout
└── README.md           # Este manual de instruções
```

---

## ✨ Funcionalidades Incluídas

1. **Simulador Visual ao Vivo (Mockup 3D)**:
   - Estrutura metálica de outdoor com malha de pixels de LED realista e brilho noturno.
   - O cliente pode enviar uma imagem/logo da empresa dele e ver como fica no painel na hora.
   - Alternância entre **Modo Noite** (alto brilho de LED) e **Modo Dia**.
   - Exemplos rápidos pré-carregados (Restaurante, Imobiliária, Concessionária, Odontologia).
   - Contador de 15 segundos da inserção com barra de progresso animada.

2. **Métricas de Tráfego e Ponto**:
   - Painel com mais de **52.000 visualizações diárias**.
   - Destaque para o tempo de retenção do semáforo (60 segundos).
   - **Google Maps Oficial Integrado**: Visualização ampliada (Zoom 19x), alternador de visão normal e Satélite HD, além de botões para abrir mapa ampliado e traçar rota no Waze/GPS.

3. **Planos & Descontos (cobrança do valor TOTAL do contrato à vista)**:
   - **Plano Mensal (1 Mês)**: R$ 900,00 (equiv. R$ 900,00/mês • 300 ins/dia • 9.000/mês)
   - **Plano Semestral (6 Meses - 10% OFF)**: R$ 4.860,00 (equiv. R$ 810,00/mês • Economia de R$ 540,00)
   - **Plano Anual (12 Meses - 20% OFF)**: R$ 8.640,00 (equiv. R$ 720,00/mês • Economia de R$ 2.160,00)
   - **Arte profissional (opcional)**: +R$ 150,00 (taxa única)

4. **Checkout & Contratação Online Completa**:
   - Coleta de dados da empresa (Razão Social, CNPJ/CPF, WhatsApp, Responsável).
   - Opção de criação profissional de arte pela sua equipe (+R$ 150 taxa única).
   - **Pagamento via Pix**: Gera QR Code Pix REAL (padrão BR Code do Banco Central) + código Pix Copia e Cola válido — o dinheiro cai **direto na chave** `+55 32 98712-8882`, sem gateway e sem taxa.
   - **Pagamento via Cartão**: Link do **InfinitePay** com a opção **"Repassando taxas"** ativada — o cliente paga o plano + taxa da operadora e você recebe **100% do valor do contrato**.
   - **Confirmação manual**: a tela mostra "Pagamento em Confirmação"; o cliente envia o comprovante pelo **WhatsApp** (mensagem montada automaticamente com número do pedido, plano, forma de pagamento e valor) e a veiculação só é ativada **depois** de você conferir o pagamento na sua conta.

---

## ⚙️ Dados Configurados (Muriaé - MG)

O arquivo [`js/mockData.js`](js/mockData.js) já está configurado com a localização real:

- **Endereço Oficial:** Praça João Pinheiro, Bairro Centro, Muriaé, Minas Gerais
- **Ponto de Referência:** Em frente ao Relógio da Praça
- **Coordenadas do Mapa:** Lat: `-21.13154`, Lng: `-42.36289` (Foco exato no Centro de Muriaé)
- **WhatsApp Comercial:** `5532987128882` (DDD 32 + 98712-8882) — é para onde o cliente envia o comprovante e onde você ativa a veiculação.
- **E-mail:** `comercial@megaledmidia.com.br`
- **Chave Pix:** `+5532987128882` (celular) — o QR Code gerado no site cai direto nesta conta.
- **Cartão (InfinitePay):** os 6 links (3 planos × com/sem arte) ficam em `CONFIG.pagamento.cartao.links` e devem ser criados no app com "Repassando taxas" ativado.
- **Preços dos Planos:** altere `precoMensal`, `precoTotal` e `descontoPercentual` em cada plano conforme sua tabela.

---

## 🌐 Como Executar e Visualizar o Site

1. Você pode abrir o site imediatamente dando um **duplo clique no arquivo `index.html`** no Windows Explorer — ele abrirá no seu navegador favorito (Chrome, Edge, Firefox, etc.).
2. O site já está publicado em **https://3mmarketing.com.br** (GitHub Pages, com HTTPS ativo e redirecionamento automático de `http://`).
3. Para republicar, basta enviar a pasta para o **Vercel**, **Netlify** ou **GitHub Pages**.
