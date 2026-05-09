import { loadStyle } from "../../styles/loadStyle.js";


/** Categorias padrão — substitua ou expanda conforme necessidade */
const DEFAULT_SERVICOS = [
  {
    id: "clinico-geral",
    label: "Clínico Geral",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=380&fit=crop",
    alt: "Consulta com clínico geral",
    pontuacao: "1200 pts",
  },
  {
    id: "cardiologia",
    label: "Cardiologia",
    img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=380&fit=crop",
    alt: "Atendimento de cardiologia",
    pontuacao: "1800 pts",
  },
  {
    id: "dermatologia",
    label: "Dermatologia",
    img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=300&h=380&fit=crop",
    alt: "Consulta dermatológica",
    pontuacao: "1600 pts",
  },
  {
    id: "pediatria",
    label: "Pediatria",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=380&fit=crop",
    alt: "Consulta pediátrica",
    pontuacao: "1400 pts",
  },
  {
    id: "odontologia",
    label: "Odontologia",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=300&h=380&fit=crop",
    alt: "Atendimento odontológico",
    pontuacao: "1700 pts",
  },
  {
    id: "psicologia",
    label: "Psicologia",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=380&fit=crop",
    alt: "Sessão de psicologia",
    pontuacao: "1500 pts",
  },
];

/* ─────────────────────────────────────────────
   Renderização
───────────────────────────────────────────── */

function renderCard({ id, label, img, alt, pontuacao }) {
  return `
    <article class="servicos-card" role="listitem">
  <a
    href="#/roupas/${id}"
    class="servicos-card-link"
    aria-label="Ver roupas ${label}"
  >
  <div
  class="servicos-card-img-wrapper"
  style="background-image: url('${img}')"
  >
  <p class="servicos-card-label-pontuacao">${pontuacao}</p>
    <p class="servicos-card-label">
      <strong>
        ${label}
      </strong>
      <br>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro in molestias explicabo, facilis officia commodi aut consequatur, similique veritatis dolore laudantium officiis molestiae aspernatur perspiciatis. Id vitae placeat voluptatibus dolore!
      </p>
    </div>
  </a>
</article>
  `;
}

export async function ServicosSection({
  categorias = DEFAULT_SERVICOS,
  titulo = "Servicos",
  href = "#/em-construcao",
} = {}) {
  loadStyle("./components/ServicosSection/ServicosSection.css");

  const cardsHTML = categorias.map(renderCard).join("");

  return `
    <section class="servicos-section pt-4" aria-labelledby="servicos-titulo">

      <div class="servicos-header container-fluid px-0">
        <a href="${href}" class="servicos-section-link" id="servicos-titulo">
          <span class="servicos-section-title">${titulo}</span>
          <span class="servicos-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div class="servicos-scroll-wrapper" role="list" aria-label="Categorias de roupas">
        <div class="servicos-track" id="servicos-track">
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
  const wrapper = document.querySelector(".servicos-scroll-wrapper");
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
  wrapper.querySelectorAll(".servicos-card-link").forEach((link) => {
    link.addEventListener("dragstart", (e) => e.preventDefault());
  });
}
