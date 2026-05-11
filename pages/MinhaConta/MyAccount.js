import { loadStyle } from "../../styles/loadStyle.js";
import { authStore } from "../../store/authStore.js";

let userCards = [
  {
    id: 1,
    name: "Cartão Principal",
    number: "****-****-****-1234",
    brand: "Visa",
    expiresAt: "12/26",
    isDefault: true,
  },
  {
    id: 2,
    name: "Cartão Backup",
    number: "****-****-****-5678",
    brand: "Mastercard",
    expiresAt: "08/27",
    isDefault: false,
  },
];

function renderMyAccount() {
  const { currentUser } = authStore.getState();

  if (!currentUser) {
    return `
      <div class="text-center">
        <p style="font-size:2rem">🔐</p>
        <h5>Acesso Restrito</h5>
        <p class="text-muted small mt-2">Você precisa estar logado para acessar sua conta.</p>
        <a href="#/login" class="btn btn-primary w-100 mt-3">Fazer Login</a>
      </div>
    `;
  }

  return `
    <h5>Minha Conta</h5>
    
    <!-- Informações Pessoais -->
    <div class="account-info mt-4 mb-4">
      <h6 class="mb-3">Informações Pessoais</h6>
      
      <div class="info-section mb-3">
        <label class="form-label fw-bold">Nome</label>
        <p class="form-control-plaintext">${currentUser.name}</p>
      </div>

      <div class="info-section mb-3">
        <label class="form-label fw-bold">Email</label>
        <p class="form-control-plaintext">${currentUser.email}</p>
      </div>

      <div class="info-section mb-3">
        <label class="form-label fw-bold">Status</label>
        <p class="form-control-plaintext">
          <span class="badge bg-success">Ativo</span>
        </p>
      </div>
    </div>

    <hr/>

    <!-- Cartões de Crédito -->
    <div class="cards-section mt-4 mb-4">
      <h6 class="mb-3">Meus Cartões</h6>
      
      <div class="cards-list">
        ${userCards
          .map(
            (card) => `
          <div class="card-item ${card.isDefault ? "default" : ""}">
            <div class="card-header">
              <span class="card-name">${card.name}</span>
              ${card.isDefault ? '<span class="badge bg-primary">Padrão</span>' : ""}
            </div>
            
            <div class="card-body">
              <div class="card-info">
                <div class="info-row">
                  <span class="label">Cartão:</span>
                  <span class="value">${card.number}</span>
                </div>
                <div class="info-row">
                  <span class="label">Bandeira:</span>
                  <span class="value">${card.brand}</span>
                </div>
                <div class="info-row">
                  <span class="label">Validade:</span>
                  <span class="value">${card.expiresAt}</span>
                </div>
              </div>
            </div>

            <div class="card-actions mt-2">
              ${
                !card.isDefault
                  ? `
                <button class="btn btn-sm btn-outline-primary" onclick="window.setDefaultCard(${card.id})">
                  Definir como Padrão
                </button>
              `
                  : ""
              }
              <button class="btn btn-sm btn-outline-danger" onclick="window.deleteCard(${card.id})">
                Remover
              </button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <button id="btn-add-card" class="btn btn-sm btn-primary mt-3 w-100">+ Adicionar Cartão</button>
    </div>

    <hr/>

    <!-- Ações da Conta -->
    <div class="form-actions mt-4">
      <button id="btn-edit-account" class="btn btn-outline-primary w-100 mb-2">Editar Dados</button>
      <button id="btn-change-password" class="btn btn-outline-secondary w-100 mb-2">Alterar Senha</button>
      <button id="btn-logout" class="btn btn-outline-danger w-100">Sair da Conta</button>
    </div>
  `;
}

function renderEditAccount() {
  const { currentUser } = authStore.getState();

  return `
    <button id="btn-back-edit" class="btn-back">← Voltar</button>
    <h5 class="mt-2">Editar Dados</h5>

    <input 
      id="input-edit-name" 
      type="text" 
      class="form-control mt-3"
      placeholder="Nome completo" 
      value="${currentUser.name}"
    />
    
    <input 
      id="input-edit-email" 
      type="email" 
      class="form-control mt-2"
      placeholder="Email" 
      value="${currentUser.email}"
    />

    <button id="btn-save-changes" class="btn btn-primary w-100 mt-3">Salvar Alterações</button>
  `;
}

function renderChangePassword() {
  return `
    <button id="btn-back-pwd" class="btn-back">← Voltar</button>
    <h5 class="mt-2">Alterar Senha</h5>

    <div class="position-relative mt-3">
      <input 
        id="input-old-password" 
        type="password" 
        class="form-control"
        placeholder="Senha atual" 
        autocomplete="current-password"
      />
    </div>

    <div class="position-relative mt-2">
      <input 
        id="input-new-password" 
        type="password" 
        class="form-control"
        placeholder="Nova senha" 
        autocomplete="new-password"
      />
    </div>

    <div class="position-relative mt-2">
      <input 
        id="input-confirm-password" 
        type="password" 
        class="form-control"
        placeholder="Confirme a nova senha" 
        autocomplete="new-password"
      />
    </div>

    <button id="btn-update-password" class="btn btn-primary w-100 mt-3">Atualizar Senha</button>
  `;
}

function renderAddCard() {
  return `
    <button id="btn-back-card" class="btn-back">← Voltar</button>
    <h5 class="mt-2">Adicionar Novo Cartão</h5>

    <input 
      id="input-card-name" 
      type="text" 
      class="form-control mt-3"
      placeholder="Nome do cartão (ex: Cartão de Crédito)" 
    />

    <input 
      id="input-card-number" 
      type="text" 
      class="form-control mt-2"
      placeholder="Número do cartão (16 dígitos)" 
      maxlength="19"
    />

    <div class="row mt-2">
      <div class="col-6">
        <input 
          id="input-card-expiry" 
          type="text" 
          class="form-control"
          placeholder="MM/AA" 
          maxlength="5"
        />
      </div>
      <div class="col-6">
        <input 
          id="input-card-cvv" 
          type="text" 
          class="form-control"
          placeholder="CVV" 
          maxlength="3"
        />
      </div>
    </div>

    <select id="select-card-brand" class="form-select mt-2">
      <option value="">Selecione a bandeira</option>
      <option value="Visa">Visa</option>
      <option value="Mastercard">Mastercard</option>
      <option value="Elo">Elo</option>
      <option value="American Express">American Express</option>
    </select>

    <div class="form-check mt-3">
      <input 
        class="form-check-input" 
        type="checkbox" 
        id="check-set-default" 
      />
      <label class="form-check-label" for="check-set-default">
        Definir como cartão padrão
      </label>
    </div>

    <button id="btn-save-card" class="btn btn-primary w-100 mt-3">Adicionar Cartão</button>
  `;
}

function renderStep() {
  const container = document.getElementById("account-step-container");
  if (!container) return;

  const state = authStore.getState();
  const mode = state.accountMode || "view";

  container.classList.add("fade-out");

  setTimeout(() => {
    if (mode === "view") container.innerHTML = renderMyAccount();
    else if (mode === "edit") container.innerHTML = renderEditAccount();
    else if (mode === "password") container.innerHTML = renderChangePassword();
    else if (mode === "add-card") container.innerHTML = renderAddCard();

    container.classList.remove("fade-out");
    attachListeners();
  }, 150);
}

function attachListeners() {
  const { currentUser, accountMode } = authStore.getState();

  if (!currentUser) return;

  if (
    accountMode !== "edit" &&
    accountMode !== "password" &&
    accountMode !== "add-card"
  ) {
    document
      .getElementById("btn-edit-account")
      ?.addEventListener("click", () => {
        authStore.setState({ accountMode: "edit" });
        renderStep();
      });

    document
      .getElementById("btn-change-password")
      ?.addEventListener("click", () => {
        authStore.setState({ accountMode: "password" });
        renderStep();
      });

    document.getElementById("btn-add-card")?.addEventListener("click", () => {
      authStore.setState({ accountMode: "add-card" });
      renderStep();
    });

    document.getElementById("btn-logout")?.addEventListener("click", () => {
      authStore.logout();
      window.location.href = "#/login";
    });
  }

  if (accountMode === "edit") {
    document.getElementById("btn-back-edit")?.addEventListener("click", () => {
      authStore.setState({ accountMode: "view" });
      renderStep();
    });

    document
      .getElementById("btn-save-changes")
      ?.addEventListener("click", () => {
        const name = document.getElementById("input-edit-name")?.value.trim();
        const email = document.getElementById("input-edit-email")?.value.trim();

        if (!name) return alert("Nome não pode ser vazio");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return alert("Email inválido");

        authStore.setState({
          currentUser: { ...currentUser, name, email },
          accountMode: "view",
        });
        renderStep();
      });
  }

  if (accountMode === "password") {
    document.getElementById("btn-back-pwd")?.addEventListener("click", () => {
      authStore.setState({ accountMode: "view" });
      renderStep();
    });

    document
      .getElementById("btn-update-password")
      ?.addEventListener("click", () => {
        const oldPwd = document.getElementById("input-old-password")?.value;
        const newPwd = document.getElementById("input-new-password")?.value;
        const confirmPwd = document.getElementById(
          "input-confirm-password",
        )?.value;

        if (!oldPwd) return alert("Digite sua senha atual");
        if (newPwd.length < 6)
          return alert("Nova senha deve ter no mínimo 6 caracteres");
        if (newPwd !== confirmPwd) return alert("As senhas não coincidem");

        authStore.setState({ accountMode: "view" });
        alert("Senha alterada com sucesso!");
        renderStep();
      });
  }

  if (accountMode === "add-card") {
    document.getElementById("btn-back-card")?.addEventListener("click", () => {
      authStore.setState({ accountMode: "view" });
      renderStep();
    });

    document.getElementById("btn-save-card")?.addEventListener("click", () => {
      const name = document.getElementById("input-card-name")?.value.trim();
      const number = document.getElementById("input-card-number")?.value.trim();
      const expiry = document.getElementById("input-card-expiry")?.value.trim();
      const cvv = document.getElementById("input-card-cvv")?.value.trim();
      const brand = document.getElementById("select-card-brand")?.value;
      const setDefault = document.getElementById("check-set-default")?.checked;

      if (!name) return alert("Digite o nome do cartão");
      if (!number || number.length < 13)
        return alert("Número de cartão inválido");
      if (!expiry || expiry.length < 5)
        return alert("Validade inválida (MM/AA)");
      if (!cvv || cvv.length < 3) return alert("CVV inválido");
      if (!brand) return alert("Selecione a bandeira");

      const formattedNumber = `****-****-****-${number.slice(-4)}`;

      const newCard = {
        id: userCards.length + 1,
        name,
        number: formattedNumber,
        brand,
        expiresAt: expiry,
        isDefault: setDefault,
      };

      if (setDefault) {
        userCards = userCards.map((card) => ({ ...card, isDefault: false }));
      }

      userCards.push(newCard);

      authStore.setState({ accountMode: "view" });
      alert("Cartão adicionado com sucesso!");
      renderStep();
    });
  }
}

window.setDefaultCard = (cardId) => {
  userCards = userCards.map((card) => ({
    ...card,
    isDefault: card.id === cardId,
  }));
  renderStep();
};

window.deleteCard = (cardId) => {
  if (confirm("Tem certeza que deseja remover este cartão?")) {
    userCards = userCards.filter((card) => card.id !== cardId);
    renderStep();
  }
};

export async function MyAccount() {
  loadStyle("./pages/MyAccount/MyAccount.css");

  const { currentUser } = authStore.getState();

  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#/">Meu Site</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/sobre">Sobre</a>
            </li>
            ${
              currentUser
                ? `
              <li class="nav-item">
                <a class="nav-link active" href="#/my-account">Minha Conta</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/login">Sair</a>
              </li>
            `
                : `
              <li class="nav-item">
                <a class="nav-link" href="#/login">Login</a>
              </li>
            `
            }
          </ul>
        </div>
      </div>
    </nav>

    <div class="login-page-wrapper">
      <div class="auth-card">
        <div id="account-step-container">
          ${renderMyAccount()}
        </div>
      </div>
    </div>
  `;
}

export function initMyAccount() {
  attachListeners();
}
