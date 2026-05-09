import { loadStyle } from "../../styles/loadStyle.js";


/** Categorias padrão — substitua ou expanda conforme necessidade */
const DEFAULT_CUPONS = [
  {
    id: "desconto-lojas",
    label: "Desconto em Lojas",
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Desconto em Lojas",
  },
  {
    id: "cashback",
    label: "Cashback",
    img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Cashback",
  },
  {
    id: "frete-gratis",
    label: "Frete Grátis",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Frete Grátis",
  },
  {
    id: "cupom-restaurante",
    label: "Restaurantes",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Restaurantes",
  },
  {
    id: "cupom-moda",
    label: "Moda",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Moda",
  },
  {
    id: "cupom-tecnologia",
    label: "Tecnologia",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Tecnologia",
  },
  {
    id: "promocoes",
    label: "Promoções Relâmpago",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Promoções Relâmpago",
  },
  {
    id: "assinaturas",
    label: "Streaming & Assinaturas",
    img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=900&q=100",
    alt: "Categoria Streaming e Assinaturas",
  },
];

/* ─────────────────────────────────────────────
   Renderização
───────────────────────────────────────────── */

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

export async function CuponsSection({
  categorias = DEFAULT_CUPONS,
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
