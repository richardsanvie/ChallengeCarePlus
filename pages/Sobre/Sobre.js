import { Cards } from "../../components/Cards/Cards.js";
import { Content } from "../../components/Content/Content.js";
import { Header } from "../../components/Header/Header.js";
import { Nav } from "../../components/Nav/Nav.js";

export async function Sobre() {
  const header = await Header();
  const nav = await Nav();
  const content = await Content();

  // Monta o layout da página com os componentes
  return `
  ${header}
  ${nav}
  ${content}
  `;
}
