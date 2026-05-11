export function injectVariables() {
  if (document.getElementById("variables-style")) return;

  const style = document.createElement("style");
  style.id = "variables-style";

  style.innerHTML = `
    :root {
      /* ── Cores ── */
      --color-primary:    #2a5298;
      --color-secondary:  #1e3c72;
      --color-accent:     #4a90d9;
      --color-background: #f4f4f4;
      --color-surface:    #ffffff;
      --color-text:       #333333;
      --color-text-light: #666666;
      --color-white:      #ffffff;

      /* ── Espaçamentos ── */
      --spacing-xs:  4px;
      --spacing-sm:  8px;
      --spacing-md:  16px;
      --spacing-lg:  24px;
      --spacing-xl:  40px;

      /* ── Tipografia ── */
      --font-main:    "Poppins", sans-serif;;
      --font-size-sm:   0.875rem;
      --font-size-base: 1rem;
      --font-size-lg:   1.25rem;
      --font-size-xl:   1.5rem;

      /* ── Border radius ── */
      --radius-sm:  4px;
      --radius-md:  8px;
      --radius-lg:  16px;

      /* ── Sombras ── */
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
    }
  `;

  document.head.appendChild(style);
}
