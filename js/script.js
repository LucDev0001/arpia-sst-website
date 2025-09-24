document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA FINAL E CORRIGIDA PARA O MENU HAMBURGER (OVERLAY) ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Função para fechar o menu
  const closeMenu = () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
    body.classList.remove("no-scroll");
  };

  // Abre/fecha o menu ao clicar no botão hamburger
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede que o clique no botão feche o menu imediatamente
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
    body.classList.toggle("no-scroll");
  });

  // Fecha o menu se clicar em um link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnToggleButton = menuToggle.contains(event.target);

    if (
      navLinks.classList.contains("active") &&
      !isClickInsideMenu &&
      !isClickOnToggleButton
    ) {
      closeMenu();
    }
  });

  // --- LÓGICA PARA EFEITOS DE SCROLL ---
  const backToTopButton = document.querySelector("#back-to-top");
  const sectionsToFade = document.querySelectorAll(".fade-in-section");

  if (backToTopButton) {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }

  if (sectionsToFade.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sectionsToFade.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // --- LÓGICA PARA A BARRA DE ROLAGEM (TICKER) ---
  // Apenas clona os itens se o ticker-move existir, pois ele será "display: none" no mobile
  const tickerMove = document.querySelector(".ticker-move");
  if (tickerMove) {
    const tickerItems = tickerMove.querySelectorAll(".ticker-item");
    tickerItems.forEach((item) => {
      const clone = item.cloneNode(true);
      tickerMove.appendChild(clone);
    });
  }
});
