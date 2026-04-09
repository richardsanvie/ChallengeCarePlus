export async function Nav() {
  const response = await fetch("./components/Nav/Nav.html");
  return await response.text();
}
