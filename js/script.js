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

  // ... (código do Ticker) ...

  // --- LÓGICA PARA VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
  const contactForm = document.querySelector("#contact-form");

  // Executa o código apenas se o formulário existir na página atual
  if (contactForm) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    contactForm.addEventListener("submit", (event) => {
      // Impede o envio padrão do formulário
      event.preventDefault();

      let isValid = validateForm();

      if (isValid) {
        // Se o formulário for válido, aqui é onde o enviaremos.
        // Por enquanto, apenas exibimos uma mensagem.
        console.log("Formulário válido, pronto para enviar!");

        // Futuramente, a linha abaixo será usada para enviar
        contactForm.submit();
      }
    });

    const validateForm = () => {
      let valid = true;
      // Validação do nome
      if (nameInput.value.trim() === "") {
        setErrorFor(nameInput, "O nome é obrigatório.");
        valid = false;
      } else {
        setSuccessFor(nameInput);
      }

      // Validação do e-mail
      if (emailInput.value.trim() === "") {
        setErrorFor(emailInput, "O e-mail é obrigatório.");
        valid = false;
      } else if (!isEmail(emailInput.value.trim())) {
        setErrorFor(emailInput, "Por favor, insira um e-mail válido.");
        valid = false;
      } else {
        setSuccessFor(emailInput);
      }

      // Validação da mensagem
      if (messageInput.value.trim() === "") {
        setErrorFor(messageInput, "A mensagem é obrigatória.");
        valid = false;
      } else {
        setSuccessFor(messageInput);
      }

      return valid;
    };

    const setErrorFor = (input, message) => {
      const formGroup = input.parentElement;
      const errorDisplay = formGroup.querySelector(".error-message");
      errorDisplay.innerText = message;
      errorDisplay.style.display = "block";
      input.classList.add("invalid");
    };

    const setSuccessFor = (input) => {
      const formGroup = input.parentElement;
      const errorDisplay = formGroup.querySelector(".error-message");
      errorDisplay.innerText = "";
      errorDisplay.style.display = "none";
      input.classList.remove("invalid");
    };

    const isEmail = (email) => {
      // Regex simples para validação de e-mail
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    };
  }

  // ... (código do Ticker) ...
  // ... (código do Formulário) ...

  // --- LÓGICA PARA O BOTÃO FLUTUANTE DO WHATSAPP ---
  const whatsappContainer = document.querySelector(".whatsapp-container");

  if (whatsappContainer) {
    // Mostra o balão 2 segundos após a página carregar
    setTimeout(() => {
      whatsappContainer.classList.add("show-bubble");
    }, 2000);

    // Esconde o balão 10 segundos depois (8 segundos de visibilidade)
    setTimeout(() => {
      whatsappContainer.classList.remove("show-bubble");
    }, 10000);
  }
}); // <-- Fechamento final do DOMContentLoaded
