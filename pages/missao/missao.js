import { Nav } from "../../components/Nav/Nav.js";
import { loadStyle } from "../../styles/loadStyle.js";
import {
  missaoActions,
  getAguaState,
  totalAtivos,
  metaBatida,
} from "../../store/missaoStore.js";

// ─── Dados do histórico (estáticos) ──────────────────────
const historico = [
  { mes: "Fev", valor: 30 },
  { mes: "Mar", valor: 55 },
  { mes: "Abr", valor: 45 },
  { mes: "Mai", valor: 70 },
  { mes: "Jun", valor: 90 },
];

// ─── Helpers de render ────────────────────────────────────
function renderSlots(slots) {
  return slots
    .map(
      (row, si) => `
    <div class="ma-slot-row">
      <span class="ma-slot-label">OUT ${si + 1}</span>
      <div class="ma-slot-buttons">
        ${row
          .map(
            (ativo, ii) => `
          <button
            class="ma-btn-agua ${ativo ? "ativo" : ""}"
            data-slot="${si}" data-item="${ii}"
            aria-pressed="${ativo}"
          >300<br>mL</button>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

function renderHistorico() {
  const max = Math.max(...historico.map((h) => h.valor));
  return historico
    .map(
      (h) => `
    <div class="ma-barra-wrap">
      <div class="ma-barra" style="height:${Math.round((h.valor / max) * 120)}px"></div>
      <span class="ma-barra-label">${h.mes}</span>
    </div>
  `,
    )
    .join("");
}

function renderProgresso(slots) {
  const ativos = totalAtivos(slots);
  const total = slots.flat().length;
  const pct = Math.round((ativos / total) * 100);
  const ml = ativos * 300;
  return `
    <div class="ma-progresso">
      <div class="ma-progresso-info">
        <span class="ma-progresso-ml">${ml} mL</span>
        <span class="ma-progresso-meta">Meta: 3.000 mL</span>
      </div>
      <div class="ma-progresso-barra">
        <div class="ma-progresso-fill" style="width:${Math.min(pct, 100)}%"></div>
      </div>
      <span class="ma-progresso-pct">${pct}% concluído</span>
    </div>
  `;
}

function renderAcao(slots, concluida) {
  if (concluida) {
    return `
      <div class="ma-concluida-banner">
        <span class="ma-concluida-icone">🎉</span>
        <div class="ma-concluida-texto">
          <strong>Missão concluída!</strong>
          <p>Você ganhou <strong>200pts</strong>. Ótimo trabalho!</p>
        </div>
        <button class="ma-btn-resetar" id="ma-btn-resetar">Reiniciar</button>
      </div>
    `;
  }
  const ok = metaBatida(slots);
  const ativos = totalAtivos(slots);
  return `
    <button
      class="ma-btn-concluir ${ok ? "habilitado" : ""}"
      id="ma-btn-concluir"
      ${!ok ? "disabled" : ""}
    >
      ${ok ? "✅ Concluir missão" : `Faltam ${10 - ativos} copo(s) para concluir`}
    </button>
  `;
}

// ─── Componente ───────────────────────────────────────────
export async function Missao() {
  loadStyle("./pages/Missao/Missao.css");
  const nav = await Nav();
  const { slots, concluida } = getAguaState();

  return `
    ${nav}
    <div class="ma-container">

      <div class="ma-header">
        <button class="ma-btn-voltar" id="ma-btn-voltar">←</button>
        <span class="ma-header-titulo">Marcar como feito</span>
        <button class="ma-btn-config">⚙</button>
      </div>

      <div class="ma-card-missao">
        <div class="ma-card-icone">💧</div>
        <div class="ma-card-info">
          <h2 class="ma-card-nome">Beba água</h2>
          <p class="ma-card-desc">Hidrate-se para manter o corpo e a mente em equilíbrio</p>
          <span class="ma-badge">Repete diariamente</span>
        </div>
      </div>

      <section class="ma-secao">
        <div class="ma-secao-header">
          <span class="ma-secao-titulo">Consumo de água</span>
          <span class="ma-meta-label">Meta 3L</span>
        </div>
        <div id="ma-slots">${renderSlots(slots)}</div>
        <div id="ma-progresso">${renderProgresso(slots)}</div>
      </section>

      <div id="ma-acao">${renderAcao(slots, concluida)}</div>

      <section class="ma-secao" style="margin-top:1.25rem">
        <h3 class="ma-secao-titulo">Histórico de missões</h3>
        <div class="ma-historico">${renderHistorico()}</div>
      </section>

      <div class="ma-premio">
        <span class="ma-premio-texto">Prêmio ao atingir a meta:</span>
        <strong class="ma-premio-pts">200pts</strong>
        <button class="ma-premio-toggle" id="ma-premio-toggle">▼</button>
      </div>

    </div>
  `;
}

// ─── Eventos ──────────────────────────────────────────────
export function MissaoEvents() {
  document.getElementById("ma-btn-voltar")?.addEventListener("click", () => {
    window.location.hash = "/";
  });

  // Delegação nos slots
  document.getElementById("ma-slots")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".ma-btn-agua");
    if (!btn) return;
    missaoActions.toggleSlot(
      parseInt(btn.dataset.slot),
      parseInt(btn.dataset.item),
    );
    atualizarUI();
  });

  registrarAcoes();

  document
    .getElementById("ma-premio-toggle")
    ?.addEventListener("click", (e) => {
      const el = e.currentTarget.closest(".ma-premio");
      el.classList.toggle("expandido");
      e.currentTarget.textContent = el.classList.contains("expandido")
        ? "▲"
        : "▼";
    });
}

function atualizarUI() {
  const { slots, concluida } = getAguaState();
  document.getElementById("ma-slots").innerHTML = renderSlots(slots);
  document.getElementById("ma-progresso").innerHTML = renderProgresso(slots);
  document.getElementById("ma-acao").innerHTML = renderAcao(slots, concluida);
  registrarAcoes();

  // Re-bind slots após re-render
  document.getElementById("ma-slots")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".ma-btn-agua");
    if (!btn) return;
    missaoActions.toggleSlot(
      parseInt(btn.dataset.slot),
      parseInt(btn.dataset.item),
    );
    atualizarUI();
  });
}

function registrarAcoes() {
  document.getElementById("ma-btn-concluir")?.addEventListener("click", () => {
    const { slots } = getAguaState();
    if (!metaBatida(slots)) return;
    missaoActions.concluir();
    atualizarUI();
    dispararConfetti();
  });

  document.getElementById("ma-btn-resetar")?.addEventListener("click", () => {
    missaoActions.resetar();
    atualizarUI();
  });
}

function dispararConfetti() {
  const container = document.querySelector(".ma-container");
  const cores = ["#4a90d9", "#2a5298", "#34d399", "#fbbf24", "#f87171"];
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement("div");
    dot.className = "ma-confetti";
    dot.style.cssText = `
      left:${Math.random() * 100}%;
      background:${cores[Math.floor(Math.random() * cores.length)]};
      animation-delay:${Math.random() * 0.6}s;
      width:${7 + Math.random() * 8}px;
      height:${7 + Math.random() * 8}px;
    `;
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 2200);
  }
}
