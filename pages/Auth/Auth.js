import { LoginPage } from "../../components/LoginPage/LoginPage.js";
import { Nav } from "../../components/Nav/Nav.js";

export async function Auth() {
  const loginComponent = await LoginPage();
  const nav = await Nav();

  // Monta o layout da página com os componentes
  return `
  ${nav}
  ${loginComponent}
  `;
}
