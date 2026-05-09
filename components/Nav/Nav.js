import { authStore } from "../../store/authStore.js";

export async function Nav() {
  const user = authStore.getCurrentUser();

  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#/">Meu Site</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/sobre">Sobre</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/recompensas">Recompensas</a>
            </li>

            ${
              user
                ? `
              <li class="nav-item">
                <a id="btn-logout" class="nav-link" href="#">Sair</a>
              </li>
            `
                : `
              <li class="nav-item">
                <a class="nav-link" href="#/login">Login</a>
              </li>
            `
            }
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
