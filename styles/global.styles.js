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
      color: var(--color-text);
      line-height: 1.6;
      margin-left: var(--sidebar-w);
      padding: 28px 28px 40px;
      min-height: 100vh;
      background: #f4f6fb;
      overflow-x: hidden;
      transition: .3s;
}
    @media (max-width: 768px) {

  body {
    margin-left: 0;
    padding:
      18px
      16px
      95px;
  }

}
  `;

  document.head.appendChild(style);
}
