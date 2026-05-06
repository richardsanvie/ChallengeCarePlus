export async function LoginPage() {
  const response = await fetch("./components/LoginPage/LoginPage.html");
  // loadStyle("./components/LoginPage/loginPage.css");

  return await response.text();
}
