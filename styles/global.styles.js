export function injectGlobalStyles() {
  if (document.getElementById("global-style")) return;

  const style = document.createElement("style");
  style.id = "global-style";

  style.innerHTML = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-main);
      background-color: var(--color-background);
      color: var(--color-text);
      line-height: 1.6;
    }

    ul {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    img {
      max-width: 100%;
      display: block;
    }
  `;

  document.head.appendChild(style);
}
