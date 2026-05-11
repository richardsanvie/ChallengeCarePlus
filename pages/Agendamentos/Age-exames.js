import { Header } from "../../components/Header/Header.js";
import { Nav } from "../../components/Nav/Nav.js";
import { initAgendamento } from "../../components/Agendamentos/Age-exames.js";

export async function Agendamentos() {

  const nav = await Nav();


  const response = await fetch("../../components/Agendamentos/Age-exames.html");

  const conteudo = await response.text();

  // CSS
  if (!document.querySelector("#agendamento-style")) {

    const link = document.createElement("link");

    link.id = "agendamento-style";
    link.rel = "stylesheet";
    link.href = "../../components/Agendamentos/Age-exames.css";

    document.head.appendChild(link);
  }

  setTimeout(() => {
    initAgendamento();
  }, 50);

  return `
    ${nav}

    <div class="main-content">
  
      ${conteudo}
    </div>
  `;
}