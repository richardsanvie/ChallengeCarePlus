import { Nav } from "../../components/Nav/Nav.js";
import { loadStyle } from "../../styles/loadStyle.js";

// ─── Dados de conteúdo ────────────────────────────────────
const banner = {
  titulo: "Sono Inteligente",
  descricao: "Como dormir melhor para recuperar o corpo e a mente",
  duracao: "12 min",
  categoria: "Recuperação",
  emoji: "🌙",
};

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "sono", label: "😴 Sono" },
  { id: "nutricao", label: "🥗 Nutrição" },
  { id: "movimento", label: "🏃 Movimento" },
  { id: "mente", label: "🧠 Mente" },
  { id: "hidratacao", label: "💧 Hidratação" },
];

const conteudos = [
  {
    id: 1,
    categoria: "sono",
    emoji: "😴",
    titulo: "Sono Inteligente",
    descricao: "Entenda como ajudar seu relógio biológico",
    duracao: "5 aulas · ⭐⭐⭐⭐",
    sub: "4 min",
    missao: null,
  },
  {
    id: 2,
    categoria: "nutricao",
    emoji: "🥗",
    titulo: "Alimentação que Cura",
    descricao: "Nutrição e Performance — aprenda como nutrir melhor",
    duracao: "4 min",
    sub: "Iniciante",
    missao: null,
  },
  {
    id: 3,
    categoria: "movimento",
    emoji: "🏃",
    titulo: "Movimento",
    descricao: "Atividade física e bem-estar — exercícios rápidos e eficazes",
    duracao: "6 min",
    sub: "Intermediário",
    missao: null,
  },
  {
    id: 4,
    categoria: "mente",
    emoji: "🧠",
    titulo: "Mente Ativa",
    descricao: "Estratégias para clareza e foco no dia a dia",
    duracao: "8 min",
    sub: "Iniciante",
    missao: null,
  },
  {
    id: 5,
    categoria: "hidratacao",
    emoji: "💧",
    titulo: "Beba Água",
    descricao: "Hidrate-se para manter o corpo e a mente em equilíbrio",
    duracao: "3 min",
    sub: "Diário",
    missao: "#/missao",
  },
  {
    id: 6,
    categoria: "sono",
    emoji: "🌙",
    titulo: "Rotina Noturna",
    descricao: "Rituais para uma noite de sono reparador",
    duracao: "5 min",
    sub: "Iniciante",
    missao: null,
  },
  {
    id: 7,
    categoria: "nutricao",
    emoji: "🫐",
    titulo: "Superfoods",
    descricao: "Os alimentos que mais beneficiam sua saúde",
    duracao: "7 min",
    sub: "Avançado",
    missao: null,
  },
  {
    id: 8,
    categoria: "mente",
    emoji: "🧘",
    titulo: "Meditação Express",
    descricao: "5 minutos de meditação para começar o dia com calma",
    duracao: "5 min",
    sub: "Diário",
    missao: null,
  },
];

// ─── Helpers ──────────────────────────────────────────────
function renderCategorias(ativa = "todos") {
  return categorias
    .map(
      (c) => `
    <button
      class="hf-cat-btn ${c.id === ativa ? "ativo" : ""}"
      data-cat="${c.id}"
    >${c.label}</button>
  `,
    )
    .join("");
}

function renderCards(filtro = "todos") {
  const lista =
    filtro === "todos"
      ? conteudos
      : conteudos.filter((c) => c.categoria === filtro);

  if (!lista.length)
    return `<p class="hf-vazio">Nenhum conteúdo nesta categoria ainda.</p>`;

  return lista
    .map(
      (c) => `
    <div class="hf-card" data-id="${c.id}">
      <div class="hf-card-thumb">
        <span class="hf-card-emoji">${c.emoji}</span>
        <span class="hf-card-duracao">${c.duracao}</span>
      </div>
      <div class="hf-card-body">
        <div class="hf-card-tag">${c.sub}</div>
        <h3 class="hf-card-titulo">${c.titulo}</h3>
        <p class="hf-card-desc">${c.descricao}</p>
        ${
          c.missao
            ? `<a href="${c.missao}" class="hf-btn-missao">Ver missão →</a>`
            : `<button class="hf-btn-ver">Assistir</button>`
        }
      </div>
    </div>
  `,
    )
    .join("");
}

// ─── Componente ───────────────────────────────────────────
export async function Healthflix() {
  loadStyle("./pages/Healthflix/Healthflix.css");
  const nav = await Nav();

  return `
    ${nav}
    <div class="hf-container">

      <!-- Topo -->
      <div class="hf-topo">
        <h1 class="hf-logo">Health<span>flix</span></h1>
        <p class="hf-tagline">Seu streaming de saúde e bem-estar</p>
      </div>

      <!-- Banner destaque -->
      <div class="hf-banner">
        <div class="hf-banner-emoji">${banner.emoji}</div>
        <div class="hf-banner-conteudo">
          <span class="hf-banner-cat">${banner.categoria}</span>
          <h2 class="hf-banner-titulo">${banner.titulo}</h2>
          <p class="hf-banner-desc">${banner.descricao}</p>
          <div class="hf-banner-acoes">
            <button class="hf-banner-btn-play">▶ Assistir agora</button>
            <span class="hf-banner-duracao">⏱ ${banner.duracao}</span>
          </div>
        </div>
      </div>

      <!-- Filtros de categoria -->
      <div class="hf-categorias-wrap">
        <div class="hf-categorias" id="hf-categorias">
          ${renderCategorias()}
        </div>
      </div>

      <!-- Grid de cards -->
      <div class="hf-grid" id="hf-grid">
        ${renderCards()}
      </div>

    </div>
  `;
}

// ─── Eventos ──────────────────────────────────────────────
export function HealthflixEvents() {
  let categoriaAtiva = "todos";

  document.getElementById("hf-categorias")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".hf-cat-btn");
    if (!btn) return;

    categoriaAtiva = btn.dataset.cat;

    // Atualiza botões ativos
    document
      .querySelectorAll(".hf-cat-btn")
      .forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    // Atualiza grid com animação
    const grid = document.getElementById("hf-grid");
    grid.style.opacity = "0";
    grid.style.transform = "translateY(8px)";
    setTimeout(() => {
      grid.innerHTML = renderCards(categoriaAtiva);
      grid.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      grid.style.opacity = "1";
      grid.style.transform = "translateY(0)";
    }, 180);
  });
}
