import { loadStyle } from "../../styles/loadStyle.js";

export async function Header({ title = "Meu Site", subtitle = "" } = {}) {
  loadStyle("./components/Header/Header.css");

  return `
    <header class="header-custom">
      <div class="container">
        <h1>${title}</h1>
        ${subtitle ? `<p class="header-subtitle">${subtitle}</p>` : ""}
      </div>
    </header>
  `;
}

// export async function Content() {
//   const response = await fetch("./components/Content/Content.html");
//   return await response.text();
// }
