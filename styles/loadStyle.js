/**
 * Injeta um arquivo CSS externo no <head> uma única vez.
 * @param {string} path - Caminho relativo ao index.html
 */
export function loadStyle(path) {
  if (document.querySelector(`link[href="${path}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;

  document.head.appendChild(link);
}
