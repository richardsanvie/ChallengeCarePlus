import { Nav } from "../../components/Nav/Nav.js";
import { Header } from "../../components/Header/Header.js";

export async function Loja() {
  const nav = await Nav();
  const header = await Header({ title: "Loja", subtitle: "Agendamentos Step 6" });

  // Carrossel com as imagens
  const carrossel = `
    <div id="carrosselLoja" class="carousel slide mb-5" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carrosselLoja" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carrosselLoja" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carrosselLoja" data-bs-slide-to="2"></button>
      </div>
      <div class="carousel-inner" style="border-radius: 12px; overflow: hidden; max-height: 320px;">
        <div class="carousel-item active">
          <img src="./assets/images/medica_tablet.png" class="d-block w-100" alt="Exame de sangue" style="object-fit: cover; max-height: 320px; object-position: center 20%;" />
          <div class="carousel-caption d-flex flex-column align-items-end text-end">
            <h5>Exame de sangue</h5>
            <p>lorem ipsum dolor sit amet</p>
            <a href="#/agendar" class="btn btn-light px-4 py-2 fw-semibold" style="border-radius:50px; color:#1565c0; letter-spacing:0.3px;">Agende sua consulta &rarr;</a>
          </div>
        </div>
        <div class="carousel-item">
          <img src="./assets/images/7283e990d4697728023bc625e097838e4744fe9a.png" class="d-block w-100" alt="Ortopedia" style="object-fit: cover; max-height: 320px;" />
          <div class="carousel-caption d-flex flex-column align-items-end text-end">
            <h5>Ortopedia</h5>
            <p>Avaliação e tratamento especializado</p>
            <a href="#/agendar" class="btn btn-light px-4 py-2 fw-semibold" style="border-radius:50px; color:#1565c0; letter-spacing:0.3px;">Agende sua consulta &rarr;</a>
          </div>
        </div>
        <div class="carousel-item">
          <img src="./assets/images/ultrassom.png" class="d-block w-100" alt="Ultrassom" style="object-fit: cover; max-height: 320px;" />
          <div class="carousel-caption d-flex flex-column align-items-end text-end">
            <h5>Ultrassom</h5>
            <p>Diagnóstico por imagem de qualidade</p>
            <a href="#/agendar" class="btn btn-light px-4 py-2 fw-semibold" style="border-radius:50px; color:#1565c0; letter-spacing:0.3px;">Agende sua consulta &rarr;</a>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carrosselLoja" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carrosselLoja" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;

  // Cards de categorias
  const cards = `
    <h4 class="mb-3">Categorias</h4>
    <div class="row g-3">
      <div class="col-md-3">
        <div class="card shadow-sm h-100" style="cursor:pointer;" onclick="window.location.hash='/agendar'">
          <img src="./assets/images/ultrassom.png" class="card-img-top" alt="Ultrassom" style="height:160px; object-fit:cover;" />
          <div class="card-body">
            <h5 class="card-title">Ultrassom de Abdome</h5>
            <p class="card-text text-muted">lorem ipsum</p>
            <a href="#/agendar" class="btn btn-primary btn-sm">Agendar</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm h-100" style="cursor:pointer;" onclick="window.location.hash='/agendar'">
          <img src="./assets/images/mamografia.png" class="card-img-top" alt="Mamografia" style="height:160px; object-fit:cover;" />
          <div class="card-body">
            <h5 class="card-title">Mamografia</h5>
            <p class="card-text text-muted">lorem ipsum</p>
            <a href="#/agendar" class="btn btn-primary btn-sm">Agendar</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm h-100" style="cursor:pointer;" onclick="window.location.hash='/agendar'">
          <img src="./assets/images/7283e990d4697728023bc625e097838e4744fe9a.png" class="card-img-top" alt="Ortopedia" style="height:160px; object-fit:cover;" />
          <div class="card-body">
            <h5 class="card-title">Ortopedia</h5>
            <p class="card-text text-muted">lorem ipsum</p>
            <a href="#/agendar" class="btn btn-primary btn-sm">Agendar</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm h-100" style="cursor:pointer;" onclick="window.location.hash='/agendar'">
          <img src="./assets/images/medica_tablet.png" class="card-img-top" alt="Exame de Sangue" style="height:160px; object-fit:cover; object-position: center 20%;" />
          <div class="card-body">
            <h5 class="card-title">Exame de Sangue</h5>
            <p class="card-text text-muted">lorem ipsum</p>
            <a href="#/agendar" class="btn btn-primary btn-sm">Agendar</a>
          </div>
        </div>
      </div>
    </div>
  `;

  return `
    ${nav}
    ${header}
    <main class="container mt-5 mb-5">
      ${carrossel}
      ${cards}
    </main>
  `;
}
