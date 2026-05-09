import { Header } from "../../components/Header/Header.js";
import { Nav } from "../../components/Nav/Nav.js";
// Importe aqui outros componentes que sua página precisar

export async function Agendamentos() {
  const nav = await Nav();
  const header = await Header({
    title: "Agendamentos",
    subtitle: "Gerencie seus agendamentos",
  });

  const response = await fetch("./pages/Agendamentos/Age-exames.html");
  
  const conteudo = await response.text();

  return `
    ${nav}
    ${conteudo}
  `;
}