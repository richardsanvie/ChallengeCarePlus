import { injectVariables } from "./styles/variables.styles.js";
import { injectGlobalStyles } from "./styles/global.styles.js";
import { Home } from "./pages/Home/Home.js";
import { Sobre } from "./pages/Sobre/Sobre.js";
import { LoginPage, initLoginPage } from "./pages/Login/Login.js";
import { initNav } from "./components/Nav/Nav.js";

// ─── Rotas ───────────────────────────────────────────────
const routes = {
  "/": Home,
  "/sobre": Sobre,
  "/login": LoginPage,
};

// Callbacks específicos por rota
const afterRender = {
  "/login": initLoginPage,
};

// ─── Renderização ─────────────────────────────────────────
async function renderPage() {
  const app = document.getElementById("app");
  const path = window.location.hash.slice(1) || "/";
  const page = routes[path] || Home;

  app.innerHTML = await page();

  // initNav roda em todas as páginas (o Nav aparece em todas)
  initNav();

  // Inicializadores específicos da rota
  afterRender[path]?.();
}

// ─── Inicialização ────────────────────────────────────────
injectVariables();
injectGlobalStyles();

window.addEventListener("hashchange", renderPage);
renderPage();