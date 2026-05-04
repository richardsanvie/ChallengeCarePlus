import { loadStyle } from "../../styles/loadStyle.js";
import { store, actions } from "../../store/appStore.js";

const PRODUTOS = ["Notebook 💻", "Mouse 🖱️", "Teclado ⌨️", "Monitor 🖥️", "Headset 🎧"];
let logLines = [];

function agora() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function adicionarLog(action, estado) {
  logLines.unshift({ time: agora(), action, contador: estado.contador, carrinho: estado.carrinho.length });
  if (logLines.length > 6) logLines.pop();
}

export function StoreDemo() {
  loadStyle("./components/StoreDemo/StoreDemo.css");

  return `
    <div class="container">
      <div class="store-demo">
        <h2>🧪 Teste do Mini Store</h2>
        <p class="subtitle">Estado global compartilhado entre componentes — igual ao Redux, só com JS puro.</p>

        <!-- Usuário -->
        <div class="user-painel">
          <div class="user-avatar" id="sd-avatar">F</div>
          <div class="user-info">
            <strong id="sd-user-name">${store.getState().user.name}</strong>
            <small>Logado: <span id="sd-user-logado">${store.getState().user.logado ? "✅ Sim" : "❌ Não"}</span></small>
          </div>
          <div class="ms-auto">
            <input
              id="sd-input-nome"
              type="text"
              class="form-control form-control-sm"
              placeholder="Mudar nome..."
              style="width:150px"
            />
          </div>
          <button class="btn btn-sm btn-outline-primary" id="sd-btn-nome">Atualizar</button>
        </div>

        <div class="row g-3">
          <!-- Contador -->
          <div class="col-md-6">
            <div class="contador-painel">
              <div class="contador-label">Contador Global</div>
              <div class="contador-valor" id="sd-contador">${store.getState().contador}</div>
              <div class="d-flex gap-2 justify-content-center">
                <button class="btn btn-light btn-sm" id="sd-btn-dec">− Decrementar</button>
                <button class="btn btn-warning btn-sm" id="sd-btn-reset">Reset</button>
                <button class="btn btn-light btn-sm" id="sd-btn-inc">+ Incrementar</button>
              </div>
            </div>
          </div>

          <!-- Carrinho -->
          <div class="col-md-6">
            <div class="carrinho-painel">
              <h4>
                🛒 Carrinho
                <span class="badge-carrinho" id="sd-badge">${store.getState().carrinho.length}</span>
              </h4>
              <div class="carrinho-lista" id="sd-carrinho-lista">
                ${renderCarrinhoItens(store.getState().carrinho)}
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary flex-grow-1" id="sd-btn-add">
                  + Adicionar item aleatório
                </button>
                <button class="btn btn-sm btn-outline-danger" id="sd-btn-limpar">Limpar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Log de ações -->
        <div class="log-acoes mt-3">
          <div class="log-titulo">📋 Log de ações (store.subscribe)</div>
          <div id="sd-log">${renderLog()}</div>
        </div>
      </div>
    </div>
  `;
}

function renderCarrinhoItens(carrinho) {
  if (carrinho.length === 0) return `<p class="text-muted" style="font-size:.85rem">Carrinho vazio</p>`;
  return carrinho
    .map((item, i) => `
      <div class="carrinho-item">
        <span>${i + 1}. ${item}</span>
      </div>
    `)
    .join("");
}

function renderLog() {
  if (logLines.length === 0) return `<span style="color:#555">Nenhuma ação ainda…</span>`;
  return logLines
    .map(
      (l) =>
        `<div class="log-linha">
          <span class="log-time">${l.time}</span>
          <span class="log-action">${l.action}</span>
          <span style="color:#f8c44b"> → contador: ${l.contador} | carrinho: ${l.carrinho}</span>
        </div>`
    )
    .join("");
}

// ─── Eventos (chamado após o HTML estar no DOM) ───────────
export function initStoreDemo() {
  // Inscreve no store — qualquer mudança no estado re-renderiza os elementos
  const unsubscribe = store.subscribe((state) => {
    // Atualiza contador com animação
    const elContador = document.getElementById("sd-contador");
    if (elContador) {
      elContador.textContent = state.contador;
      elContador.classList.add("bounce");
      setTimeout(() => elContador.classList.remove("bounce"), 150);
    }

    // Atualiza badge do carrinho
    const elBadge = document.getElementById("sd-badge");
    if (elBadge) {
      elBadge.textContent = state.carrinho.length;
      elBadge.classList.add("pop");
      setTimeout(() => elBadge.classList.remove("pop"), 200);
    }

    // Atualiza lista do carrinho
    const elLista = document.getElementById("sd-carrinho-lista");
    if (elLista) elLista.innerHTML = renderCarrinhoItens(state.carrinho);

    // Atualiza usuário
    const elNome = document.getElementById("sd-user-name");
    const elAvatar = document.getElementById("sd-avatar");
    const elLogado = document.getElementById("sd-user-logado");
    if (elNome) elNome.textContent = state.user.name;
    if (elAvatar) elAvatar.textContent = state.user.name[0].toUpperCase();
    if (elLogado) elLogado.textContent = state.user.logado ? "✅ Sim" : "❌ Não";

    // Atualiza log
    const elLog = document.getElementById("sd-log");
    if (elLog) elLog.innerHTML = renderLog();
  });

  // Botões do contador
  document.getElementById("sd-btn-inc")?.addEventListener("click", () => {
    adicionarLog("INCREMENTAR", store.getState());
    actions.incrementar();
    // O log é adicionado antes do dispatch para pegar o estado pós-mudança no subscribe
    // Reescrevendo para pegar depois:
  });

  document.getElementById("sd-btn-dec")?.addEventListener("click", () => {
    actions.decrementar();
    adicionarLog("DECREMENTAR", store.getState());
  });

  document.getElementById("sd-btn-reset")?.addEventListener("click", () => {
    actions.resetarContador();
    adicionarLog("RESETAR_CONTADOR", store.getState());
  });

  // Botões do carrinho
  document.getElementById("sd-btn-add")?.addEventListener("click", () => {
    const item = PRODUTOS[Math.floor(Math.random() * PRODUTOS.length)];
    actions.adicionarAoCarrinho(item);
    adicionarLog(`ADICIONAR_AO_CARRINHO (${item})`, store.getState());
  });

  document.getElementById("sd-btn-limpar")?.addEventListener("click", () => {
    actions.limparCarrinho();
    adicionarLog("LIMPAR_CARRINHO", store.getState());
  });

  // Atualizar nome do usuário
  document.getElementById("sd-btn-nome")?.addEventListener("click", () => {
    const input = document.getElementById("sd-input-nome");
    const novoNome = input?.value.trim();
    if (novoNome) {
      actions.setUser({ ...store.getState().user, name: novoNome });
      adicionarLog(`SET_USER (${novoNome})`, store.getState());
      input.value = "";
    }
  });

  // Limpa inscrição ao sair da página (boa prática)
  window.addEventListener("hashchange", unsubscribe, { once: true });
}
