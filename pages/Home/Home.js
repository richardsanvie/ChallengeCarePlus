import { Header } from "../../components/Header/Header.js";
import { Nav } from "../../components/Nav/Nav.js";
import { Cards } from "../../components/Cards/Cards.js";
import { Content } from "../../components/Content/Content.js";
import { StoreDemo, initStoreDemo } from "../../components/StoreDemo/StoreDemo.js";

export async function Home() {
  const header = await Header({
    title: "Bem vindo",
    subtitle: "Subtítulo aqui",
  });
  const cards = await Cards();
  const nav = await Nav();
  const content = await Content();
  const storeDemo = StoreDemo(); // síncrono, não precisa de await

  const html = `
    ${nav}
    ${header}
    ${content}
    ${cards}
    ${storeDemo}
  `;

  // Inicializa os eventos do StoreDemo após o HTML ser inserido no DOM
  setTimeout(initStoreDemo, 0);

  return html;
}
