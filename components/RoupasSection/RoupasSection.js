import { loadStyle } from "../../styles/loadStyle.js";

/** Categorias padrão — substitua ou expanda conforme necessidade */
const DEFAULT_ROUPAS = [
  {
    id: "camisa-social",
    label: "Camisa Social",
    categoria: "Social",
    preco: "R$ 129,90",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=380&fit=crop",
    alt: "Camisa social masculina branca",
  },
  {
    id: "blazer-premium",
    label: "Blazer Premium",
    categoria: "Social",
    preco: "R$ 349,90",
    img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&h=380&fit=crop",
    alt: "Blazer social elegante",
  },
  {
    id: "vestido-elegante",
    label: "Vestido Elegante",
    categoria: "Feminino",
    preco: "R$ 219,90",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=380&fit=crop",
    alt: "Vestido feminino elegante",
  },
  {
    id: "jaqueta-jeans",
    label: "Jaqueta Jeans",
    categoria: "Casual",
    preco: "R$ 189,90",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=380&fit=crop",
    alt: "Jaqueta jeans azul",
  },
  {
    id: "camiseta-basica",
    label: "Camiseta Básica",
    categoria: "Casual",
    preco: "R$ 59,90",
    img: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=300&h=380&fit=crop",
    alt: "Camiseta casual básica",
  },
  {
    id: "calca-jeans",
    label: "Calça Jeans",
    categoria: "Casual",
    preco: "R$ 139,90",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=380&fit=crop",
    alt: "Calça jeans masculina",
  },
  {
    id: "conjunto-academia",
    label: "Conjunto Academia",
    categoria: "Academia",
    preco: "R$ 159,90",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=380&fit=crop",
    alt: "Roupa fitness academia",
  },
  {
    id: "moletom-oversized",
    label: "Moletom Oversized",
    categoria: "Streetwear",
    preco: "R$ 179,90",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=380&fit=crop",
    alt: "Moletom oversized streetwear",
  },
  {
    id: "tenis-esportivo",
    label: "Tênis Esportivo",
    categoria: "Calçados",
    preco: "R$ 249,90",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=380&fit=crop",
    alt: "Tênis esportivo moderno",
  },
];

/* ─────────────────────────────────────────────
   Renderização
───────────────────────────────────────────── */

function renderCard({ id, label, img, alt }) {
  return `
    <article class="roupas-card" role="listitem">
      <a href="#/roupas/${id}" class="roupas-card-link" aria-label="Ver roupas ${label}">
        <div class="roupas-card-img-wrapper">
          <img
            src="${img}"
            alt="${alt}"
            class="roupas-card-img"
            loading="lazy"
          />
        </div>
        <p class="roupas-card-label">${label}</p>
      </a>
    </article>
  `;
}

export async function RoupasSection({
  categorias = DEFAULT_ROUPAS,
  titulo = "Roupas",
  href = "#/em-construcao",
} = {}) {
  loadStyle("./components/RoupasSection/RoupasSection.css");

  const cardsHTML = categorias.map(renderCard).join("");

  return `
    <section class="roupas-section pt-4" aria-labelledby="roupas-titulo">

      <div class="roupas-header container-fluid px-0">
        <a href="${href}" class="roupas-section-link" id="roupas-titulo">
          <span class="roupas-section-title">${titulo}</span>
          <span class="roupas-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div class="roupas-scroll-wrapper" role="list" aria-label="Categorias de roupas">
        <div class="roupas-track" id="roupas-track">
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
  const wrapper = document.querySelector(".roupas-scroll-wrapper");
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
  wrapper.querySelectorAll(".roupas-card-link").forEach((link) => {
    link.addEventListener("dragstart", (e) => e.preventDefault());
  });
}
