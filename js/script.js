// --- LÓGICA PARA O MENU HAMBURGER ---
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// --- LÓGICA PARA EFEITOS DE SCROLL ---

// Seleciona os elementos
const backToTopButton = document.querySelector("#back-to-top");
const sectionsToFade = document.querySelectorAll(".fade-in-section");

// Função para o Botão "Voltar ao Topo"
const handleScroll = () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
};

// Intersection Observer para animação de Fade-in
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
    threshold: 0.1, // A animação começa quando 10% da seção estiver visível
  }
);

// Adiciona os "escutadores" de eventos
window.addEventListener("scroll", handleScroll);
sectionsToFade.forEach((section) => {
  sectionObserver.observe(section);
});

// --- LÓGICA PARA A BARRA DE ROLAGEM (TICKER) ---
const tickerMove = document.querySelector(".ticker-move");

// Clona todos os itens da barra
const tickerItems = document.querySelectorAll(".ticker-item");
tickerItems.forEach((item) => {
  const clone = item.cloneNode(true);
  tickerMove.appendChild(clone);
});
