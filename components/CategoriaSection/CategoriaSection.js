import { loadStyle } from "../../styles/loadStyle.js";



/** Categorias padrão — substitua ou expanda conforme necessidade */
const DEFAULT_CATEGORIAS = [
  {
    id: "roupas",
    label: "Roupas",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=380&fit=crop",
    alt: "Categoria Roupas",
  },
  {
    id: "brindes",
    label: "Brindes",
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=380&fit=crop",
    alt: "Categoria Brindes",
  },
  {
    id: "servicos",
    label: "Serviços",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=380&fit=crop",
    alt: "Categoria Serviços",
  },
  {
    id: "cupons",
    label: "Cupons",
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300&h=380&fit=crop",
    alt: "Categoria Cupons",
  },
  {
    id: "calcados",
    label: "Calçados",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=380&fit=crop",
    alt: "Categoria Calçados",
  },
  {
    id: "acessorios",
    label: "Acessórios",
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=380&fit=crop",
    alt: "Categoria Acessórios",
  },
  {
    id: "beleza",
    label: "Beleza",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=380&fit=crop",
    alt: "Categoria Beleza",
  },
  {
    id: "eletronicos",
    label: "Eletrônicos",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=380&fit=crop",
    alt: "Categoria Eletrônicos",
  },
  {
    id: "decoracao",
    label: "Decoração",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=380&fit=crop",
    alt: "Categoria Decoração",
  },
  {
    id: "gastronomia",
    label: "Gastronomia",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=380&fit=crop",
    alt: "Categoria Gastronomia",
  },
  {
    id: "viagens",
    label: "Viagens",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=380&fit=crop",
    alt: "Categoria Viagens",
  },
  {
    id: "academia",
    label: "Academia",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=380&fit=crop",
    alt: "Categoria Academia",
  },
];

/* ─────────────────────────────────────────────
   Renderização
───────────────────────────────────────────── */

function renderCard({ id, label, img, alt }) {
  return `
    <article class="categorias-card" role="listitem">
      <a href="#/roupas/${id}" class="categorias-card-link" aria-label="Ver roupas ${label}">
        <div class="categorias-card-img-wrapper">
          <img
            src="${img}"
            alt="${alt}"
            class="categorias-card-img"
            loading="lazy"
          />
        </div>
        <p class="categorias-card-label text-center">${label}</p>
      </a>
    </article>
  `;
}

export async function CategoriaSection({
  categorias = DEFAULT_CATEGORIAS,
  titulo = "Categorias",
  href = "#/em-construcao",
} = {}) {
  loadStyle("./components/CategoriaSection/CategoriaSection.css");

  const cardsHTML = categorias.map(renderCard).join("");

  return `
    <section class="categorias-section pt-4" aria-labelledby="categorias-titulo">

      <div class="categorias-header container-fluid px-0">
        <a href="${href}" class="categorias-section-link" id="categorias-titulo">
          <span class="categorias-section-title">${titulo}</span>
          <span class="categorias-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div class="categorias-scroll-wrapper" role="list" aria-label="Categorias de roupas">
        <div class="categorias-track" id="categorias-track">
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
  const wrapper = document.querySelector(".categorias-scroll-wrapper");
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
  wrapper.querySelectorAll(".categorias-card-link").forEach((link) => {
    link.addEventListener("dragstart", (e) => e.preventDefault());
  });
}
