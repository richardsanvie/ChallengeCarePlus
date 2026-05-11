import { loadStyle } from "../../styles/loadStyle.js";
import { authStore } from "../../store/authStore.js";

// ─── Templates de cada etapa ─────────────────────────────

function stepEmail({ error }) {
  return `
    <h5>Entrar no <span class="text-primary fw-bold">Care Plus</span></h5>

    <button id="btn-google" class="btn btn-outline-secondary w-100 mt-3" disabled>
      Fazer login com o Google
    </button>
    <button id="btn-apple" class="btn btn-outline-secondary w-100 mt-2" disabled>
      Entrar com Apple
    </button>

    <p class="divider-text">ou</p>
    <p class="text-center">digite seu email para <b>criar</b> ou <b>acessar</b> sua conta</p>

    <input
      id="input-email"
      type="email"
      class="form-control mt-2 ${error ? "is-invalid" : ""}"
      placeholder="Digite seu email"
      value="${authStore.getState().email}"
      autocomplete="email"
    />
    ${error ? `<div class="invalid-feedback">${error}</div>` : ""}

    <button id="btn-advance"class="btn btn-primary w-100 mt-3"onclick="window.location.hash='#/home'">Avançar</button>
  `;
}

function stepPassword({ email, error }) {
  return `
    <button id="btn-back" class="btn-back">← Voltar</button>
    <h5 class="mt-2">Entrar no <span class="text-primary"></span></h5>
    <p class="text-muted small mb-0">${email}</p>

    <div class="position-relative mt-3">
      <input
        id="input-password"
        type="password"
        class="form-control ${error ? "is-invalid" : ""}"
        placeholder="Digite sua senha"
        autocomplete="current-password"
      />
      <!--<span class="eye" id="toggle-password">👁</span>-->
      ${error ? `<div class="invalid-feedback">${error}</div>` : ""}
    </div>

    <button id="btn-login" class="btn btn-primary w-100 mt-3">Fazer login</button>

    <p class="small mt-2" style="cursor:pointer" id="btn-forgot">
      Esqueceu sua senha?
    </p>
  `;
}

function stepRegister({ email, error }) {
  return `
    <button id="btn-back" class="btn-back">← Voltar</button>
    <h5 class="mt-2">Criar sua conta <span class="text-primary fw-bold fw-bold">Care Plus</span></h5>

    <input id="input-name"     type="text"  class="form-control mt-3"                               placeholder="Seu nome completo" />
    <input id="input-email-reg" type="email" class="form-control mt-2"                              placeholder="Seu email" value="${email}" />

    <div class="position-relative mt-2">
      <input id="input-pass1" type="password" class="form-control ${error ? "is-invalid" : ""}" placeholder="Crie uma senha" />
      <!--<span class="eye" id="toggle-pass1">👁</span>-->
    </div>

    <div class="position-relative mt-2">
      <input id="input-pass2" type="password" class="form-control" placeholder="Confirme sua senha" />
      <!--<span class="eye" id="toggle-pass2">👁</span>-->
    </div>

    ${error ? `<div class="text-danger small mt-1">${error}</div>` : ""}

    <button id="btn-create" class="btn btn-primary w-100 mt-3">Criar conta</button>

    <p class="text-center small mt-2">
      Já tem uma conta?
      <span class="text-primary" style="cursor:pointer" id="btn-go-login">Acesse aqui</span>
    </p>
  `;
}

function stepSuccess({ name }) {
  setTimeout(() => {
    window.location.href = "#/sobre";
  }, 150);

  return `
    <div class="text-center">
      <p style="font-size:3rem">✅</p>
      <h5>Olá, <span class="text-primary">${name}</span>!</h5>
      <p class="text-muted small mt-2">
        Você está logado no Care Plus.
      </p>
     <button id="btn-logout" class="btn btn-outline-secondary w-100 mt-3">Sair</button>
    </div>
  `;
}

// ─── Renderização ─────────────────────────────────────────

function renderStep() {
  const container = document.getElementById("auth-step-container");
  if (!container) return;

  const { step, email, error, currentUser } = authStore.getState();

  container.classList.add("fade-out");

  setTimeout(() => {
    if (currentUser) container.innerHTML = stepSuccess(currentUser);
    else if (step === "email") container.innerHTML = stepEmail({ error });
    else if (step === "password")
      container.innerHTML = stepPassword({ email, error });
    else if (step === "register")
      container.innerHTML = stepRegister({ email, error });

    container.classList.remove("fade-out");
    attachListeners();
  }, 150);
}

// ─── Listeners ────────────────────────────────────────────

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

function togglePassword(toggleId, inputId) {
  document.getElementById(toggleId)?.addEventListener("click", () => {
    const input = document.getElementById(inputId);
    if (input) input.type = input.type === "password" ? "text" : "password";
  });
}

// ─── Componente exportado ─────────────────────────────────

export async function LoginPage() {
  loadStyle("./components/LoginPage/loginPage.css");

  // Se já houver usuário logado, começa na tela de sucesso
  const { currentUser } = authStore.getState();

  return `

  
  <div class="login-page-wrapper">
      <div class="auth-card">
        <div id="auth-step-container">
          ${currentUser ? stepSuccess(currentUser) : stepEmail({ error: "" })}
        </div>
      </div>
    </div>
  `;
}

export function initLoginPage() {
  attachListeners();
}



