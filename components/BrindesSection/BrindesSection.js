import { loadStyle } from "../../styles/loadStyle.js";



/** Categorias padrão — substitua ou expanda conforme necessidade */
const DEFAULT_BRINDES = [
  {
    id: "caneca",
    label: "Copo Personalizado",
    img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&h=380&fit=crop",
    alt: "Copo personalizado de brinde",
  },
  {
    id: "ecobag",
    label: "Ecobag Exclusiva",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=380&fit=crop",
    alt: "Ecobag exclusiva de brinde",
  },
  {
    id: "fone",
    label: "Fone Bluetooth",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=380&fit=crop",
    alt: "Fone bluetooth como brinde",
  },
  {
    id: "garrafa",
    label: "Garrafa Térmica",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=380&fit=crop",
    alt: "Garrafa térmica de brinde",
  },
  {
    id: "camiseta",
    label: "Camiseta Exclusiva",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=380&fit=crop",
    alt: "Camiseta exclusiva de brinde",
  },
  {
    id: "vale",
    label: "Vale Compras",
    img: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=300&h=380&fit=crop",
    alt: "Vale compras promocional",
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
    <article class="brindes-card" role="listitem">
      <a href="#/roupas/${id}" class="brindes-card-link" aria-label="Ver roupas ${label}">
        <div class="brindes-card-img-wrapper">
          <img
            src="${img}"
            alt="${alt}"
            class="brindes-card-img"
            loading="lazy"
          />
        </div>
        <p class="brindes-card-label">${label}</p>
      </a>
    </article>
  `;
}


export async function BrindesSection({
  categorias = DEFAULT_BRINDES,
  titulo = "Brindes",
  href = "#/em-construcao",
} = {}) {
  loadStyle("./components/BrindesSection/BrindesSection.css");

  const cardsHTML = categorias.map(renderCard).join("");

  return `
    <section class="brindes-section pt-4" aria-labelledby="brindes-titulo">

      <div class="brindes-header container-fluid px-0">
        <a href="${href}" class="brindes-section-link" id="brindes-titulo">
          <span class="brindes-section-title">${titulo}</span>
          <span class="brindes-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div class="brindes-scroll-wrapper" role="list" aria-label="Categorias de roupas">
        <div class="brindes-track" id="brindes-track">
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
  const wrapper = document.querySelector(".brindes-scroll-wrapper");
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
  wrapper.querySelectorAll(".brindes-card-link").forEach((link) => {
    link.addEventListener("dragstart", (e) => e.preventDefault());
  });
}
