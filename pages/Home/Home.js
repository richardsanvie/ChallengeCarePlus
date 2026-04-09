import { Header } from "../../components/Header/Header.js";
import { Nav } from "../../components/Nav/Nav.js";
import { Cards } from "../../components/Cards/Cards.js";
import { Content } from "../../components/Content/Content.js";

export async function Home() {
  const header = await Header({
    title: "Bem vindo",
    subtitle: "Subtítulo aqui",
  });
  const cards = await Cards();
  const nav = await Nav();
  const content = await Content();

  // Monta o layout da página com os componentes
  return `
  ${nav}
  ${header}
  ${content}
  ${cards}
  `;
}
