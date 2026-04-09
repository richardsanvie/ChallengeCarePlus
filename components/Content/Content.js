export async function Content() {
  const response = await fetch("./components/Content/Content.html");
  return await response.text();
}
