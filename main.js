import { injectVariables } from "./styles/variables.styles.js";
import { injectGlobalStyles } from "./styles/global.styles.js";
import { Home } from "./pages/Home/Home.js";
import { Sobre } from "./pages/Sobre/Sobre.js";
import { LoginPage, initLoginPage } from "./pages/Login/Login.js";
import { SobreCopy } from "./pages/SobreCopy/SobreCopy.js";

// ─── Rotas ───────────────────────────────────────────────
const routes = {
  "/": Home,
  "/sobre": Sobre,
  "/sobreCopy": SobreCopy,
  "/login": LoginPage,
};

// Callbacks pós-render por rota (para inicializar listeners)
const afterRender = {
  "/login": initLoginPage,
};

// ─── Renderização ─────────────────────────────────────────
async function renderPage() {
  const app = document.getElementById("app");
  const path = window.location.hash.slice(1) || "/";
  const page = routes[path] || Home;

  app.innerHTML = await page();

  // Inicializa lógica específica da página, se houver
  afterRender[path]?.();
}

// ─── Inicialização ────────────────────────────────────────
injectVariables();
injectGlobalStyles();

window.addEventListener("hashchange", renderPage);
renderPage();
