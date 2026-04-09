export async function Cards() {
  const response = await fetch("./components/Cards/Cards.html");
  return await response.text();
}
