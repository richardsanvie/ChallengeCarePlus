import { injectVariables } from "./styles/variables.styles.js";
import { injectGlobalStyles } from "./styles/global.styles.js";
import { Home } from "./pages/Home/Home.js";
import { Sobre } from "./pages/Sobre/Sobre.js";
import { LoginPage, initLoginPage } from "./pages/Login/Login.js";
import { initNav } from "./components/Nav/Nav.js";
import { Recompensas } from "./pages/Recompensas/Recompensas.js";
import { Missao, MissaoEvents } from "./pages/missao/missao.js";
import { Healthflix, HealthflixEvents } from "./pages/healthflix/Healthflix.js";
import { Agendamentos } from "./pages/Agendamentos/Age-exames.js";

// ─── Rotas ───────────────────────────────────────────────
const routes = {
  "/": LoginPage,
  "/home": Home,
  "/sobre": Sobre,
  "/login": LoginPage,
  "/recompensas": Recompensas,
  "/agendamentos": Agendamentos,
  "/missao": Missao,
  "/healthflix": Healthflix,
};

// Callbacks específicos por rota
const afterRender = {
  "/login": initLoginPage,
  "/missao": MissaoEvents,
  "/healthflix": HealthflixEvents,
};

// ─── Renderização ─────────────────────────────────────────
async function renderPage() {
  const app = document.getElementById("app");
  const path = window.location.hash.slice(1) || "/";
  const page = routes[path] || Home;

  app.innerHTML = await page();

  // initNav roda em todas as páginas (o Nav aparece em todas)
  initNav();
  initHeader();

  // Inicializadores específicos da rota
  afterRender[path]?.();
}

// ─── Inicialização ────────────────────────────────────────
injectVariables();
injectGlobalStyles();

window.addEventListener("hashchange", renderPage);
renderPage();
