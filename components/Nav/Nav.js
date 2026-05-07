export async function Nav() {
  const response = await fetch("./components/Nav/Nav.html");
  return `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#/">Meu Site</a>

    <!-- Botão hamburguer para mobile -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Links -->
    <div class="collapse navbar-collapse" id="navbarMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="#/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/sobre">Sobre</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/login">Login</a>
        </li>
        <li class="nav-item">
          <a id="btn-logout" class="nav-link" href="#/login">Sair</a>
        </li>
        <!-- Adicione novos links aqui -->
      </ul>
    </div>
  </div>
</nav>

  `;
}

function attachListeners() {
  const { step, currentUser } = authStore.getState();

  if (currentUser) {
    document.getElementById("btn-logout")?.addEventListener("click", () => {
      authStore.logout();
      renderStep();
    });
    return;
  }

  // Botão voltar (password e register)
  document.getElementById("btn-back")?.addEventListener("click", () => {
    authStore.goToStep("email");
    renderStep();
  });

  if (step === "email") {
    const advance = () => {
      const email = document.getElementById("input-email")?.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        authStore.setError("Digite um e-mail válido.");
        renderStep();
        return;
      }

      authStore.setEmail(email);
      authStore.goToStep(
        authStore.emailExists(email) ? "password" : "register",
      );
      renderStep();
    };

    document.getElementById("btn-advance")?.addEventListener("click", advance);
    document.getElementById("input-email")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") advance();
    });
  }

  if (step === "password") {
    document.getElementById("btn-login")?.addEventListener("click", () => {
      const password = document.getElementById("input-password")?.value;
      const { email } = authStore.getState();

      if (!password) {
        authStore.setError("Digite sua senha.");
        renderStep();
        return;
      }

      authStore.login({ email, password });
      renderStep();
    });

    togglePassword("toggle-password", "input-password");
  }

  if (step === "register") {
    document.getElementById("btn-create")?.addEventListener("click", () => {
      const name = document.getElementById("input-name")?.value.trim();
      const email = document.getElementById("input-email-reg")?.value.trim();
      const pass1 = document.getElementById("input-pass1")?.value;
      const pass2 = document.getElementById("input-pass2")?.value;

      if (!name) return (authStore.setError("Digite seu nome."), renderStep());
      if (pass1.length < 6)
        return (
          authStore.setError("Senha mínima: 6 caracteres."),
          renderStep()
        );
      if (pass1 !== pass2)
        return (authStore.setError("As senhas não coincidem."), renderStep());

      authStore.register({ name, email, password: pass1 });
      renderStep();
    });

    document.getElementById("btn-go-login")?.addEventListener("click", () => {
      authStore.goToStep("email");
      renderStep();
    });

    togglePassword("toggle-pass1", "input-pass1");
    togglePassword("toggle-pass2", "input-pass2");
  }
}
