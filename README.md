# 🚀 MegaLED | Plataforma de Venda e Gestão de Publicidade em Painel de LED Outdoor

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

3. **Planos & Descontos por Recorrência**:
   - **Plano Mensal (1 Mês)**: R$ 900,00 / mês (180 ins/dia • 5.400 total)
   - **Plano Semestral (6 Meses - 10% OFF)**: R$ 810,00 / mês (Total R$ 4.860,00 • Economia de R$ 540,00)
   - **Plano Anual (12 Meses - 20% OFF)**: R$ 720,00 / mês (Total R$ 8.640,00 • Economia de R$ 2.160,00)

4. **Checkout & Contratação Online Completa**:
   - Coleta de dados da empresa (Razão Social, CNPJ/CPF, WhatsApp, Responsável).
   - Opção de criação profissional de arte pela sua equipe (+R$ 150 taxa única).
   - **Pagamento via Pix**: Gera QR Code instantâneo + código Pix Copia e Cola funcional.
   - **Pagamento via Cartão de Crédito**: Formulário estilizado com parcelamento em até 12x.
   - **Integração com WhatsApp**: Botão de confirmação que monta automaticamente a mensagem com número do pedido, plano e valores prontos para o anunciante te enviar no WhatsApp.

---

## ⚙️ Dados Configurados (Muriaé - MG)

O arquivo [`js/mockData.js`](file:///C:/Users/Desktop/.gemini/antigravity/scratch/painel-led-outdoor/js/mockData.js) já está configurado com a localização real:

- **Endereço Oficial:** Praça João Pinheiro, Número 20, Bairro Centro, Muriaé, Minas Gerais
- **Ponto de Referência:** Em frente ao Relógio da Praça
- **Coordenadas do Mapa:** Lat: `-21.13154`, Lng: `-42.36289` (Foco exato no Centro de Muriaé)
- **WhatsApp:** Altere `'5511999999999'` para o seu número com DDD (ex: `'5532999998888'`).
- **Preços dos Planos:** Altere `precoBaseDia` em cada plano conforme sua tabela.

---

## 🌐 Como Executar e Visualizar o Site

1. Você pode abrir o site imediatamente dando um **duplo clique no arquivo [`index.html`](file:///C:/Users/Desktop/.gemini/antigravity/scratch/painel-led-outdoor/index.html)** no Windows Explorer. Ele abrirá no seu navegador favorito (Chrome, Edge, Firefox, etc.).
2. Para publicar o site na internet gratuitamente com seu próprio link, basta subir a pasta para o **Vercel**, **Netlify** ou **GitHub Pages**.
