import { injectVariables } from "./styles/variables.styles.js";
import { injectGlobalStyles } from "./styles/global.styles.js";
import { Home } from "./pages/Home/Home.js";
import { Sobre } from "./pages/Sobre/Sobre.js";
import { Auth } from "./pages/Auth/Auth.js";

// ─── Rotas ───────────────────────────────────────────────
const routes = {
  "/": Home,
  "/sobre": Sobre,
  "/auth": Auth,
};

// ─── Renderização ─────────────────────────────────────────
// O main.js só decide QUAL página renderizar.
// Cada página é responsável por montar seu próprio layout,
// importando os componentes que precisar (Header, Nav, etc.)
async function renderPage() {
  const app = document.getElementById("app");
  const path = window.location.hash.slice(1) || "/";
  const page = routes[path] || Home;

  app.innerHTML = await page();
}

// ─── Inicialização ────────────────────────────────────────
injectVariables();
injectGlobalStyles();

window.addEventListener("hashchange", renderPage);
renderPage();
