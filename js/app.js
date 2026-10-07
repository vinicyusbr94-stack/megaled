// Lógica Interativa da Plataforma de Publicidade em Painel de LED

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização de Componentes
  initIcons();
  initSimulador();
  initCalculadora();
  initMapa();
  initCheckout();
  initFaq();
});

// 1. Inicializar Ícones Lucide
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 2. Estado Global da Aplicação
const appState = {
  planoSelecionado: CONFIG.planos[1], // Plano Semestral (10% OFF - R$ 810/mês) por padrão
  artePersonalizadaUrl: null,
  modoAmbiente: 'night', // 'night' ou 'day'
  opcaoCriacaoArte: false, // +R$ 150 se selecionado
  metodoPagamento: 'pix',
  contadorInsercaoSegundos: 15
};

// 3. Módulo do Simulador de Arte no Painel de LED
function initSimulador() {
  const outdoorRig = document.getElementById("outdoorRig");
  const ledCanvas = document.getElementById("ledCanvasContent");
  const toggleAmbienteBtn = document.getElementById("toggleAmbienteBtn");
  const uploadArteInput = document.getElementById("uploadArteInput");
  const timerProgressBar = document.getElementById("timerProgressBar");
  const timerText = document.getElementById("timerText");
  const exemplosArtesContainer = document.getElementById("exemplosArtesContainer");

  // Renderizar botões de exemplos pré-definidos (12 ramos)
  if (exemplosArtesContainer) {
    exemplosArtesContainer.innerHTML = CONFIG.artesExemplo.map((arte, idx) => `
      <button 
        type="button" 
        data-index="${idx}"
        title="${arte.nome}"
        class="exemplo-arte-btn px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-all border border-gray-700 flex items-center gap-1.5 leading-tight"
      >
        <i data-lucide="${arte.icone}" class="w-3.5 h-3.5 shrink-0" style="color: ${arte.corFundo}"></i>
        ${arte.categoria}
      </button>
    `).join('');

    // Os icones dos botoes so existem depois que o HTML e injetado
    initIcons();

    document.querySelectorAll(".exemplo-arte-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-index"));
        aplicarArteExemplo(CONFIG.artesExemplo[index]);
      });
    });
  }

  // Alternar Dia e Noite
  if (toggleAmbienteBtn) {
    toggleAmbienteBtn.addEventListener("click", () => {
      if (appState.modoAmbiente === 'night') {
        appState.modoAmbiente = 'day';
        outdoorRig.classList.add("day-mode");
        toggleAmbienteBtn.innerHTML = `<i data-lucide="sun" class="w-4 h-4 text-amber-400"></i> Modo Dia (Simulação ao Sol)`;
      } else {
        appState.modoAmbiente = 'night';
        outdoorRig.classList.remove("day-mode");
        toggleAmbienteBtn.innerHTML = `<i data-lucide="moon" class="w-4 h-4 text-blue-400"></i> Modo Noite (Alto Brilho)`;
      }
      initIcons();
    });
  }

  // Upload de Imagem Personalizada
  if (uploadArteInput) {
    uploadArteInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          appState.artePersonalizadaUrl = event.target.result;
          renderizarImagemNoPainel(appState.artePersonalizadaUrl);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Iniciar com o primeiro exemplo
  aplicarArteExemplo(CONFIG.artesExemplo[0]);

  // Animação de contagem regressiva da inserção (15s)
  let tempoRestante = 15;
  setInterval(() => {
    tempoRestante -= 0.5;
    if (tempoRestante <= 0) {
      tempoRestante = 15;
    }
    const percent = ((15 - tempoRestante) / 15) * 100;
    if (timerProgressBar) timerProgressBar.style.width = `${percent}%`;
    if (timerText) timerText.innerText = `Exibição: ${Math.ceil(tempoRestante)}s`;
  }, 500);
}

function aplicarArteExemplo(arte) {
  const ledCanvas = document.getElementById("ledCanvasContent");
  if (!ledCanvas) return;

  ledCanvas.innerHTML = `
    <div class="w-full h-full p-6 flex flex-col justify-between items-center text-center relative overflow-hidden" style="background: radial-gradient(circle at center, ${arte.corFundo}, #0a0a0f);">
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
      
      <span class="inline-block px-3 py-1 bg-yellow-400 text-black font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg">
        ${arte.badge}
      </span>
      
      <div class="my-auto z-10">
        <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-md mb-2">
          ${arte.titulo}
        </h2>
        <p class="text-sm md:text-base text-gray-200 font-medium max-w-md mx-auto drop-shadow">
          ${arte.subtitulo}
        </p>
      </div>

      <div class="w-full flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-2 z-10">
        <span class="font-bold text-white tracking-widest">MEGA PAINEL LED</span>
        <span class="text-blue-400">ANUNCIE AQUI: (32) 98712-8882</span>
      </div>
    </div>
  `;
}

function renderizarImagemNoPainel(imageUrl) {
  const ledCanvas = document.getElementById("ledCanvasContent");
  if (!ledCanvas) return;

  ledCanvas.innerHTML = `
    <div class="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
      <img src="${imageUrl}" alt="Arte do Anunciante" class="w-full h-full object-cover">
      <div class="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] text-gray-300 backdrop-blur-sm">
        Sua Arte em Alta Resolução P3
      </div>
    </div>
  `;
}

// 4. Módulo dos Planos de Exibição (Mensal R$ 900, Semestral R$ 810/mês, Anual R$ 720/mês)
function initCalculadora() {
  const planosContainer = document.getElementById("planosCardsContainer");

  if (planosContainer) {
    planosContainer.innerHTML = CONFIG.planos.map(plano => `
      <div 
        data-plano-id="${plano.id}"
        class="plano-card relative rounded-3xl p-7 glass-panel glass-panel-hover flex flex-col justify-between cursor-pointer border-2 transition-all ${plano.destaque ? 'border-blue-500 shadow-2xl shadow-blue-500/25 bg-gradient-to-b from-blue-950/40 to-gray-900/90 ring-1 ring-blue-400/50' : 'border-gray-800'}"
        onclick="selecionarPlano('${plano.id}')"
      >
        ${plano.destaque ? `
          <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[11px] uppercase px-4 py-1 rounded-full shadow-lg tracking-wider border border-blue-400">
            ${plano.badge}
          </span>
        ` : plano.badge ? `
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-emerald-400 font-bold text-[10px] uppercase px-3 py-0.5 rounded-full border border-gray-700 shadow-sm">
            ${plano.badge}
          </span>
        ` : ''}

        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-2xl font-extrabold text-white font-heading">${plano.nome}</h3>
            <span class="text-xs px-2.5 py-1 bg-blue-900/50 text-blue-300 font-semibold rounded-full border border-blue-700/40">
              ${plano.meses} ${plano.meses === 1 ? 'Mês' : 'Meses'}
            </span>
          </div>

          <p class="text-gray-400 text-xs mb-6 leading-relaxed">${plano.descricao}</p>

          <!-- Preço Mensal com Destaque -->
          <div class="mb-6 pb-6 border-b border-gray-800/80">
            <div class="text-[11px] text-gray-400 mb-1 font-medium">Investimento Mensal:</div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-sm font-semibold text-gray-400">R$</span>
              <span class="text-4xl font-extrabold text-white">${plano.precoMensal.toFixed(2).replace('.', ',')}</span>
              <span class="text-xs text-gray-400">/mês</span>
            </div>

            ${plano.descontoPercentual > 0 ? `
              <div class="mt-2.5 text-xs flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/50 w-fit">
                <i data-lucide="tag" class="w-3.5 h-3.5"></i>
                ${plano.descontoPercentual}% OFF • Economia de R$ ${plano.economiaTotal.toFixed(2).replace('.', ',')}
              </div>
              <div class="text-[11px] text-gray-400 mt-2">
                Contrato total (${plano.meses}x): <span class="line-through">R$ ${plano.precoSemDesconto.toFixed(2).replace('.', ',')}</span> 
                <strong class="text-white">R$ ${plano.precoTotal.toFixed(2).replace('.', ',')}</strong>
              </div>
            ` : `
              <div class="mt-2 text-xs text-gray-400">
                Valor total do mês: <strong class="text-white">R$ 900,00</strong> (Tabela padrão)
              </div>
            `}
          </div>

          <ul class="space-y-3 mb-8 text-xs text-gray-300">
            ${plano.recursos.map(rec => `
              <li class="flex items-start gap-2.5">
                <i data-lucide="check-circle" class="w-4 h-4 text-blue-400 shrink-0 mt-0.5"></i>
                <span class="leading-relaxed">${rec}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <button 
          type="button"
          onclick="event.stopPropagation(); selecionarPlano('${plano.id}')"
          class="w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${plano.destaque ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-600/30' : 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700'}"
        >
          <span>Contratar ${plano.nome}</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');
  }

  atualizarCalculos();
  initIcons();
}

function atualizarCalculos() {
  const plano = appState.planoSelecionado;
  if (!plano) return;

  const totalInsercoes = plano.meses * 30 * plano.insercoesDia;
  const impactosEstimados = totalInsercoes * 50; // Média estimada de visualizações
  const adicionalArte = appState.opcaoCriacaoArte ? 150 : 0;
  const valorTotalFinal = plano.precoTotal + adicionalArte;
  const custoPorInsercao = valorTotalFinal / totalInsercoes;

  const statInsercoes = document.getElementById("statTotalInsercoes");
  const statImpactos = document.getElementById("statImpactosEstimados");
  const statCustoInsercao = document.getElementById("statCustoInsercao");
  const statInvestimento = document.getElementById("statInvestimentoTotal");

  if (statInsercoes) statInsercoes.innerText = totalInsercoes.toLocaleString('pt-BR');
  if (statImpactos) statImpactos.innerText = impactosEstimados.toLocaleString('pt-BR') + "+";
  if (statCustoInsercao) statCustoInsercao.innerText = "R$ " + custoPorInsercao.toFixed(2).replace('.', ',');
  if (statInvestimento) statInvestimento.innerText = "R$ " + valorTotalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  initIcons();
}

function selecionarPlano(planoId) {
  const plano = CONFIG.planos.find(p => p.id === planoId);
  if (plano) {
    appState.planoSelecionado = plano;
    atualizarCalculos();
    abrirCheckout();
  }
}

// 5. Módulo do Google Maps (Localização Ampliada & Alternador Mapa/Satélite)
function initMapa() {
  // Inicialização do Google Maps já configurada no iframe
}

function alternarModoGoogleMaps(modo) {
  const iframe = document.getElementById("iframeGoogleMaps");
  const btnMapa = document.getElementById("btnModoMapa");
  const btnSatelite = document.getElementById("btnModoSatelite");

  if (!iframe) return;

  if (modo === 'satelite') {
    // Modo Satélite HD com alta aproximação fotográfica (z=19)
    iframe.src = `https://maps.google.com/maps?q=${CONFIG.mapa.lat},${CONFIG.mapa.lng}&t=k&z=19&ie=UTF8&iwloc=&output=embed`;
    
    if (btnSatelite && btnMapa) {
      btnSatelite.classList.add("bg-blue-600", "text-white", "font-bold", "shadow-md");
      btnSatelite.classList.remove("text-gray-400", "font-semibold");
      btnMapa.classList.remove("bg-blue-600", "text-white", "font-bold", "shadow-md");
      btnMapa.classList.add("text-gray-400", "font-semibold");
    }
  } else {
    // Modo Mapa Tradicional com ruas, comércios e ponto ampliado (z=19)
    iframe.src = `https://maps.google.com/maps?q=Pra%C3%A7a+Jo%C3%A3o+Pinheiro%2C+20%2C+Centro%2C+Muria%C3%A9+-+MG&t=&z=19&ie=UTF8&iwloc=&output=embed`;
    
    if (btnMapa && btnSatelite) {
      btnMapa.classList.add("bg-blue-600", "text-white", "font-bold", "shadow-md");
      btnMapa.classList.remove("text-gray-400", "font-semibold");
      btnSatelite.classList.remove("bg-blue-600", "text-white", "font-bold", "shadow-md");
      btnSatelite.classList.add("text-gray-400", "font-semibold");
    }
  }
  initIcons();
}

// 7. Módulo de Checkout & Pagamento Online
function initCheckout() {
  const modal = document.getElementById("checkoutModal");
  const fecharModalBtn = document.getElementById("fecharCheckoutModalBtn");
  const tabPixBtn = document.getElementById("tabPixBtn");
  const tabCartaoBtn = document.getElementById("tabCartaoBtn");
  const formCheckout = document.getElementById("formCheckoutContratacao");
  const copiarPixBtn = document.getElementById("copiarPixBtn");
  const simularPixPagoBtn = document.getElementById("simularPixPagoBtn");
  const checkCriacaoArte = document.getElementById("checkCriacaoArte");

  if (fecharModalBtn && modal) {
    fecharModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Alternar Abas Pix e Cartão
  if (tabPixBtn && tabCartaoBtn) {
    tabPixBtn.addEventListener("click", () => {
      appState.metodoPagamento = 'pix';
      tabPixBtn.classList.add("bg-blue-600", "text-white");
      tabPixBtn.classList.remove("text-gray-400");
      tabCartaoBtn.classList.remove("bg-blue-600", "text-white");
      tabCartaoBtn.classList.add("text-gray-400");

      document.getElementById("areaPixPagamento").classList.remove("hidden");
      document.getElementById("areaCartaoPagamento").classList.add("hidden");
    });

    tabCartaoBtn.addEventListener("click", () => {
      appState.metodoPagamento = 'cartao';
      tabCartaoBtn.classList.add("bg-blue-600", "text-white");
      tabCartaoBtn.classList.remove("text-gray-400");
      tabPixBtn.classList.remove("bg-blue-600", "text-white");
      tabPixBtn.classList.add("text-gray-400");

      document.getElementById("areaPixPagamento").classList.add("hidden");
      document.getElementById("areaCartaoPagamento").classList.remove("hidden");
    });
  }

  // Adicional de Criação de Arte (+R$ 150)
  if (checkCriacaoArte) {
    checkCriacaoArte.addEventListener("change", (e) => {
      appState.opcaoCriacaoArte = e.target.checked;
      atualizarResumoCheckout();
    });
  }

  // Copiar Chave Pix Copia e Cola
  if (copiarPixBtn) {
    copiarPixBtn.addEventListener("click", () => {
      const pixCode = document.getElementById("inputPixCopiaCola").value;
      navigator.clipboard.writeText(pixCode).then(() => {
        copiarPixBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Código Copiado!`;
        initIcons();
        setTimeout(() => {
          copiarPixBtn.innerHTML = `<i data-lucide="copy" class="w-4 h-4"></i> Copiar Código Pix`;
          initIcons();
        }, 3000);
      });
    });
  }

  // Submissão do Formulário de Checkout (Cartão ou Simulação)
  if (formCheckout) {
    formCheckout.addEventListener("submit", (e) => {
      e.preventDefault();
      concluirPedidoSucesso();
    });
  }

  if (simularPixPagoBtn) {
    simularPixPagoBtn.addEventListener("click", () => {
      concluirPedidoSucesso();
    });
  }
}

function abrirCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  atualizarResumoCheckout();
  modal.classList.remove("hidden");
}

function atualizarResumoCheckout() {
  const plano = appState.planoSelecionado;
  if (!plano) return;

  const valorBruto = plano.precoSemDesconto;
  const desconto = plano.economiaTotal;
  const adicionalArte = appState.opcaoCriacaoArte ? 150.00 : 0.00;
  const valorTotal = plano.precoTotal + adicionalArte;

  // Atualizar dados visuais no modal
  const nomePlanoModal = document.getElementById("modalNomePlano");
  const periodoModal = document.getElementById("modalPeriodoDias");
  const totalInsercoesModal = document.getElementById("modalTotalInsercoes");
  const subtotalModal = document.getElementById("modalSubtotalValor");
  const descontoModal = document.getElementById("modalDescontoValor");
  const totalFinalModal = document.getElementById("modalTotalFinalValor");
  const totalPixValor = document.getElementById("pixValorExato");

  if (nomePlanoModal) nomePlanoModal.innerText = `${plano.nome} (R$ ${plano.precoMensal.toFixed(2).replace('.', ',')}/mês)`;
  if (periodoModal) periodoModal.innerText = `${plano.meses} ${plano.meses === 1 ? 'Mês' : 'Meses'} (${plano.dias} Dias)`;
  if (totalInsercoesModal) totalInsercoesModal.innerText = (plano.meses * 30 * plano.insercoesDia).toLocaleString('pt-BR');
  
  if (subtotalModal) {
    if (desconto > 0) {
      subtotalModal.innerText = `R$ ${valorBruto.toFixed(2).replace('.', ',')}`;
      subtotalModal.classList.remove("hidden");
    } else {
      subtotalModal.classList.add("hidden");
    }
  }

  if (descontoModal) {
    if (desconto > 0) {
      descontoModal.innerText = `- R$ ${desconto.toFixed(2).replace('.', ',')} (${plano.descontoPercentual}% OFF)`;
      descontoModal.classList.remove("hidden");
    } else {
      descontoModal.classList.add("hidden");
    }
  }

  if (totalFinalModal) totalFinalModal.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  if (totalPixValor) totalPixValor.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

  // Gerar QR Code Dinâmico via API aberta de QR Code
  const pixCopiaCola = `00020126580014br.gov.bcb.pix0136${CONFIG.empresa.email}520400005303986540${valorTotal.toFixed(2)}5802BR5920${CONFIG.empresa.nome.substring(0, 20)}6009MURIAE62070503***6304`;
  const qrImg = document.getElementById("qrCodePixImg");
  const inputPix = document.getElementById("inputPixCopiaCola");

  if (inputPix) inputPix.value = pixCopiaCola;
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(pixCopiaCola)}`;
  }

  // Preencher Opções de Parcelamento no Cartão
  const selectParcelas = document.getElementById("cartaoParcelas");
  if (selectParcelas) {
    selectParcelas.innerHTML = '';
    const maxParcelas = plano.meses === 1 ? 3 : 12;
    for (let i = 1; i <= maxParcelas; i++) {
      const valorParcela = (valorTotal / i).toFixed(2).replace('.', ',');
      selectParcelas.innerHTML += `
        <option value="${i}">
          ${i}x de R$ ${valorParcela} ${i <= 3 ? 'sem juros' : '(com taxa do cartão)'}
        </option>
      `;
    }
  }
}

function concluirPedidoSucesso() {
  const areaFormulario = document.getElementById("checkoutEtapasConteudo");
  const areaSucesso = document.getElementById("checkoutSucessoConteudo");

  if (areaFormulario) areaFormulario.classList.add("hidden");
  if (areaSucesso) areaSucesso.classList.remove("hidden");

  const numPedido = "#LED-" + Math.floor(100000 + Math.random() * 900000);
  const pedidoNumeroEl = document.getElementById("sucessoNumPedido");
  if (pedidoNumeroEl) pedidoNumeroEl.innerText = numPedido;

  // Montar link para envio dos dados no WhatsApp
  const btnWhats = document.getElementById("btnConfirmarWhatsApp");
  if (btnWhats) {
    const nomeCliente = document.getElementById("inputNomeAnunciante")?.value || "Anunciante";
    const empresaCliente = document.getElementById("inputEmpresaAnunciante")?.value || "Minha Empresa";
    const plano = appState.planoSelecionado;
    const valorFinal = plano.precoTotal + (appState.opcaoCriacaoArte ? 150 : 0);

    const mensagemWhats = encodeURIComponent(
      `Olá! Acabei de contratar publicidade no Painel de LED da Praça João Pinheiro (Muriaé) pelo site!\n\n` +
      `*Número do Pedido:* ${numPedido}\n` +
      `*Empresa:* ${empresaCliente}\n` +
      `*Responsável:* ${nomeCliente}\n` +
      `*Plano:* ${plano.nome} (${plano.meses} ${plano.meses === 1 ? 'Mês' : 'Meses'})\n` +
      `*Mensalidade Equivalente:* R$ ${plano.precoMensal.toFixed(2).replace('.', ',')} / mês\n` +
      `*Desconto Aplicado:* ${plano.descontoPercentual > 0 ? plano.descontoPercentual + '% OFF' : 'Tabela base'}\n` +
      `*Valor Total do Contrato:* R$ ${valorFinal.toFixed(2).replace('.', ',')}\n\n` +
      `Envio o comprovante para ativarmos a veiculação!`
    );

    btnWhats.href = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${mensagemWhats}`;
  }

  initIcons();
}


// 8. Módulo de Perguntas Frequentes (FAQ)
function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (btn && answer) {
      btn.addEventListener("click", () => {
        const isHidden = answer.classList.contains("hidden");
        // Fechar outros
        document.querySelectorAll(".faq-answer").forEach(a => a.classList.add("hidden"));
        document.querySelectorAll(".faq-icon").forEach(i => i.classList.remove("rotate-180"));

        if (isHidden) {
          answer.classList.remove("hidden");
          if (icon) icon.classList.add("rotate-180");
        }
      });
    }
  });
}
