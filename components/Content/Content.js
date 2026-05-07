import { authStore } from "../../store/authStore.js";

export async function Content() {
  const user = authStore.getCurrentUser();
  return `
  <main class="container mt-5">
    <div class="row">
      <div class="col-12">
        <h2>Bem-vindo ${user ? user.name : ""}</h2>
        <p class="mt-3 text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, perspiciatis autem fugiat officia qui quia commodi asperiores! Esse dignissimos ipsa, natus molestias alias dolor ducimus reprehenderit obcaecati maiores similique magni?
        </p>
      </div>
    </div>
  </main>
  `;
}
