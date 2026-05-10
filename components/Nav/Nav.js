import { authStore } from "../../store/authStore.js";

export async function Nav() {
  const user = authStore.getCurrentUser();

  return `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand text-primary fw-bold" href="#/">Care Plus</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMenu">
          <ul class="navbar-nav ms-auto fw-semibold">
            <li class="nav-item">
              <a class="nav-link" href="#/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/sobre">Sobre</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/recompensas">Loja</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/agendamentos">Agendar</a>
            </li>

            ${user ? `
              <li class="nav-item">
                <span class="nav-link text-muted small mt-1">${user.name}</span>
              </li>
              <li class="nav-item">
                <a id="btn-logout" class="nav-link text-danger" href="#">Sair</a>
              </li>
            ` : `
              <li class="nav-item">
                <a class="nav-link text-primary" href="#/login">Login</a>
              </li>
            `}
          </ul>
        </div>
      </div>
    </nav>
  `;
}

export function initNav() {
  document.getElementById("btn-logout")?.addEventListener("click", (e) => {
    e.preventDefault();
    authStore.logout();
    window.location.hash = "/";
  });
}