import { Nav } from "../../components/Nav/Nav.js";

export async function SobreCopy() {
  const nav = await Nav();

  // Monta o layout da página com os componentes
  return `
  ${nav}
  `;
}
