import { authStore } from "../../store/authStore.js";

export async function Nav() {

  const user = authStore.getCurrentUser();
  const currentHash = window.location.hash || "#/";

  const links = [
    { href: "#/home",         icon: "bi-house-door-fill",  label: "Início" },
    { href: "#/agendamentos", icon: "bi-calendar3",        label: "Agendar" },
    { href: "#/exames",       icon: "bi-clipboard2-pulse", label: "Exames" },
    { href: "#/consultas",    icon: "bi-hospital",         label: "Consultas" },
    { href: "#/missoes",      icon: "bi-crosshair",        label: "Missões" },
    { href: "#/trilha",       icon: "bi-trophy",           label: "Trilha" },
    { href: "#/healthflix",   icon: "bi-camera-reels",     label: "CareFlix" },
    { href: "#/rewards",         icon: "bi-basket3",          label: "Loja" },
    { href: "#/conta",        icon: "bi-person",           label: "Minha Conta" },
  ];

  const navLinks = links.map(({ href, icon, label }) => {

    const isActive = href === "#/"
      ? currentHash === "#/" || currentHash === "#"
      : currentHash.startsWith(href);

    return `
      <a class="nav-link-side ${isActive ? "active" : ""}" href="${href}">
        <i class="bi ${icon}"></i>
        ${label}
      </a>
    `;

  }).join("");

  return `
  
    <!-- SIDEBAR DESKTOP -->
    <aside class="sidebar">

      <div class="sidebar-logo">
        <a href="#/home">
          <i class="bi bi-heart-pulse"></i>
        </a>
      </div>

      <nav class="d-flex flex-column w-100 gap-1">
        ${navLinks}
      </nav>

      <div class="sidebar-promo">

        <div style="font-size:28px;">
          <i class="bi bi-trophy-fill"></i>
        </div>

        <div class="fw-800 text-white" style="font-size:13px; margin-top:6px;">
          Você está<br>indo muito bem!
        </div>

        <p>
          Continue assim para<br>
          alcançar seus objetivos.
        </p>

      </div>

    </aside>

    <!-- MOBILE NAV -->
    <nav class="mobile-bottom-nav">

      <a href="#/" class="${currentHash === "#/" || currentHash === "#" ? "active" : ""}">
        <i class="bi bi-house-door-fill"></i>
        <span>Início</span>
      </a>

      <a href="#/agendamentos" class="${currentHash.startsWith("#/agendamentos") ? "active" : ""}">
        <i class="bi bi-calendar3"></i>
        <span>Agendar</span>
      </a>

      <a href="#/exames" class="${currentHash.startsWith("#/exames") ? "active" : ""}">
        <i class="bi bi-clipboard2-pulse"></i>
        <span>Exames</span>
      </a>

      <a href="#/consultas" class="${currentHash.startsWith("#/consultas") ? "active" : ""}">
        <i class="bi bi-hospital"></i>
        <span>Consultas</span>
      </a>

      <button id="mobileMenuBtn">
        <i class="bi bi-list"></i>
        <span>Mais</span>
      </button>

    </nav>

    <!-- MENU MOBILE -->
    <div class="mobile-menu-overlay" id="mobileMenu">

      <div class="mobile-menu">

        <a href="#/missoes">
          <i class="bi bi-crosshair"></i>
          Missões
        </a>

        <a href="#/trilha">
          <i class="bi bi-trophy"></i>
          Trilha
        </a>

        <a href="#/healthflix">
          <i class="bi bi-camera-reels"></i>
          CareFlix
        </a>

        <a href="#/reward">
          <i class="bi bi-basket3"></i>
          Loja
        </a>

        <a href="#/conta">
          <i class="bi bi-person"></i>
          Minha Conta
        </a>

      </div>

    </div>

  `;
}

export function initNav() {

  setTimeout(() => {

    document.getElementById("btn-logout")?.addEventListener("click", (e) => {
      e.preventDefault();

      authStore.logout();

      window.location.hash = "/";
    });

    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileBtn && mobileMenu) {

      mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
      });

      mobileMenu.addEventListener("click", (e) => {

        if (e.target === mobileMenu) {
          mobileMenu.classList.remove("open");
        }

      });

    }

  }, 0);

}