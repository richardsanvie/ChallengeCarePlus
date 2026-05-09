import { loadStyle } from "../../styles/loadStyle.js";

/**
 * @typedef {Object} RoupaCategoria
 * @property {string} id     - Identificador único (usado na rota e no atributo aria-label)
 * @property {string} label  - Texto exibido abaixo da imagem
 * @property {string} img    - URL da imagem da categoria
 * @property {string} alt    - Texto alternativo para acessibilidade
 */

/** Categorias padrão — substitua ou expanda conforme necessidade */
const DEFAULT_CATEGORIAS = [
  {
    id: "social",
    label: "Social",
    img: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=300&h=380&fit=crop&crop=faces",
    alt: "Categoria Social",
  },
  {
    id: "casual",
    label: "Casual",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=380&fit=crop&crop=faces",
    alt: "Categoria Casual",
  },
  {
    id: "academia",
    label: "Academia",
    img: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=300&h=380&fit=crop&crop=faces",
    alt: "Categoria Academia",
  },
  {
    id: "academia",
    label: "Academia",
    img: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=300&h=380&fit=crop&crop=faces",
    alt: "Categoria Academia",
  },
  {
    id: "academia",
    label: "Academia",
    img: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=300&h=380&fit=crop&crop=faces",
    alt: "Categoria Academia",
  },
  {
    id: "academia",
    label: "Academia",
    img: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=300&h=380&fit=crop&crop=faces",
    alt: "Categoria Academia",
  },
];

/* ─────────────────────────────────────────────
   Renderização
───────────────────────────────────────────── */

/**
 * Gera o HTML de um único card de categoria.
 * @param {RoupaCategoria} categoria
 * @returns {string}
 */
function renderCard({ id, label, img, alt }) {
  return `
    <article class="cupons-card" role="listitem">
      <a href="#/roupas/${id}" class="cupons-card-link" aria-label="Ver roupas ${label}">
        <div class="cupons-card-img-wrapper">
          <img
            src="${img}"
            alt="${alt}"
            class="cupons-card-img"
            loading="lazy"
          />
        </div>
        <p class="cupons-card-label">${label}</p>
      </a>
    </article>
  `;
}

/**
 * Componente Roupas.
 *
 * @param {Object}           [opcoes={}]
 * @param {RoupaCategoria[]} [opcoes.categorias] - Lista de categorias. Usa padrão se omitido.
 * @param {string}           [opcoes.titulo]     - Título da seção.
 * @param {string}           [opcoes.href]       - Destino do link "ver todos".
 * @returns {Promise<string>} HTML renderizado como string.
 */
export async function CuponsSection({
  categorias = DEFAULT_CATEGORIAS,
  titulo = "Cupons",
  href = "#/em-construcao",
} = {}) {
  loadStyle("./components/CuponsSection/CuponsSection.css");

  const cardsHTML = categorias.map(renderCard).join("");

  return `
    <section class="cupons-section pt-4" aria-labelledby="cupons-titulo">

      <div class="cupons-header container-fluid px-0">
        <a href="${href}" class="cupons-section-link" id="cupons-titulo">
          <span class="cupons-section-title">${titulo}</span>
          <span class="cupons-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div class="cupons-scroll-wrapper" role="list" aria-label="Categorias de roupas">
        <div class="cupons-track" id="cupons-track">
          ${cardsHTML}
        </div>
      </div>

    </section>
  `;
}

/* ─────────────────────────────────────────────
   Comportamento interativo
   Chamado após o HTML ser injetado no DOM.
───────────────────────────────────────────── */

/**
 * Habilita drag-to-scroll no carrossel de roupas.
 * Deve ser chamado uma vez após o componente ser inserido no DOM.
 */
export function initRoupas() {
  const wrapper = document.querySelector(".cupons-scroll-wrapper");
  if (!wrapper) return;

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  /* Desktop — drag com mouse */
  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.classList.add("is-dragging");
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove("is-dragging");
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const delta = (x - startX) * 1.5; /* multiplicador para scroll mais ágil */
    wrapper.scrollLeft = scrollLeft - delta;
  });

  /* Evita navegação acidental ao arrastar */
  wrapper.querySelectorAll(".cupons-card-link").forEach((link) => {
    link.addEventListener("dragstart", (e) => e.preventDefault());
  });
}
