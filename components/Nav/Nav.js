import { authStore } from "../../store/authStore.js";

export async function Nav() {
  const user = authStore.getCurrentUser();

  return `
    <nav class="navbar navbar-expand-lg bg-nav ">
  <div class="container ">
    <a class="navbar-brand logo" href="#/"> <img src="/images/logo.png" alt="Logo"></a>

    <!-- Botão hamburguer para mobile -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Links -->
    <div class="collapse navbar-collapse  " id="navbarMenu">
      <ul class="navbar-nav ms-auto poppins-semibold ">
        <li class="nav-item">
          <a class="nav-link" href="#/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/clinicas">Clínicas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/careplus">CarePlus+</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/planoseprodutos">Planos e Produtos</a>
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
