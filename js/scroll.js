// Efeitos de Scroll e Parallax
// - Revelacao animada dos blocos ao entrar na tela (IntersectionObserver)
// - Parallax suave nas camadas decorativas (requestAnimationFrame)
// Ambos sao desligados automaticamente em quem prefere menos movimento.

(function () {
  "use strict";

  // Respeita a preferencia do sistema por "reduzir movimento"
  const prefereSemMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1. REVELACAO AO ROLAR A PAGINA
     Os elementos com [data-reveal] entram com opacidade 0 e
     uma direcao/deslocamento. Quando aparecem na tela, recebem
     a classe .reveal-visivel e voltam ao lugar.
     ========================================================= */
  function iniciarRevelacao() {
    const alvos = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");

    if (!alvos.length) return;

    // Sem animacao: mostra tudo de uma vez
    if (prefereSemMovimento) {
      alvos.forEach((el) => el.classList.add("reveal-visivel"));
      return;
    }

    // Navegador antigo: mostra tudo
    if (!("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.classList.add("reveal-visivel"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("reveal-visivel");
          observador.unobserve(entrada.target); // anima uma vez e encerra
        });
      },
      {
        threshold: 0.12,          // 12% visivel ja dispara
        rootMargin: "0px 0px -60px 0px" // comeca um pouco antes de encostar embaixo
      }
    );

    alvos.forEach((el) => observador.observe(el));
  }

  /* =========================================================
     2. PARALLAX
     Elementos com [data-parallax="0.2"] se movem verticalmente
     em 20% da distancia percorrida pela pagina, criando
     profundidade. O valor e escrito na variavel --parallax-y.
     ========================================================= */
  function iniciarParallax() {
    const itens = Array.from(document.querySelectorAll("[data-parallax]"));

    if (!itens.length) return;

    /* Parallax e desvanecimento sao ignorados juntos (o bloco inteiro
       simplesmente fica parado). */
    if (prefereSemMovimento) return;

    let agendado = false;

    function calcular() {
      const alturaTela = window.innerHeight;

      itens.forEach((el) => {
        const caixa = el.getBoundingClientRect();

        // Fora da tela: nao gasta calculo
        if (caixa.bottom < -250 || caixa.top > alturaTela + 250) return;

        // Forca do parallax (0.05 = bem leve | 0.4 = bem forte)
        const forca = parseFloat(el.dataset.parallax) || 0.2;

        // Posicao do centro do elemento em relacao ao centro da tela
        // -1 = elemento acima da tela | 0 = centralizado | +1 = abaixo
        const posicao = (caixa.top + caixa.height / 2 - alturaTela / 2) / alturaTela;

        const deslocamento = posicao * forca * -100;
        el.style.setProperty("--parallax-y", deslocamento.toFixed(2) + "px");

        /* Desvanecimento opcional (usado nas informacoes da 1a secao):
           comeca em 1 e cai para 0 conforme o bloco sai pela parte de
           cima da tela. Mede pela borda INFERIOR do elemento, para que
           ele ja comece totalmente visivel ao abrir a pagina. */
        if (el.dataset.parallaxFade !== undefined) {
          const progresso = (caixa.top + caixa.height) / alturaTela;
          const opacidade = Math.min(1, Math.max(0, progresso * 1.2));
          el.style.setProperty("--parallax-fade", opacidade.toFixed(3));
        }
      });

      agendado = false;
    }

    function aoRolar() {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(calcular);
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });

    // Primeira execucao ao carregar a pagina
    calcular();
  }

  /* =========================================================
     3. NAVEGACAO SUAVE PELOS BOTOES DO MENU
     Compensa a altura do cabecalho fixo ao pular para a secao.
     ========================================================= */
  function iniciarNavegacaoSuave() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", function (evento) {
        const alvo = link.getAttribute("href");

        // Ignora links vazios ou externos
        if (!alvo || alvo === "#" || alvo.length < 2) return;

        const destino = document.querySelector(alvo);
        if (!destino) return;

        evento.preventDefault();

        const alturaCabecalho = 80; // cabeçalho fixo
        const topo = destino.getBoundingClientRect().top + window.pageYOffset - alturaCabecalho;

        window.scrollTo({
          top: topo,
          behavior: prefereSemMovimento ? "auto" : "smooth"
        });
      });
    });
  }

  /* ---------- Inicializacao ---------- */
  function iniciar() {
    iniciarRevelacao();
    iniciarParallax();
    iniciarNavegacaoSuave();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();