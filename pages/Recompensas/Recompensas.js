import { Nav } from "../../components/Nav/Nav.js";

export async function Recompensas() {
  const nav = await Nav();

  return `
    ${nav}
    <style>
      .loja-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        transition: all 0.3s ease;
      }
      .loja-card {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      .custom-arrow {
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      .custom-arrow:hover {
        background-color: #fff;
        color: #000;
      }
    </style>
    
    <main class="container mt-5 mb-5">
      <!-- Cabeçalho -->
      <div class="mb-4">
        <h2 class="fw-bold m-0" style="border-bottom: 4px solid #1565c0; display: inline-block; padding-bottom: 4px; padding-right: 20px;">LOJA</h2>
        <p class="text-muted mt-2" style="font-size: 0.95rem;">Agendamentos Step 6</p>
      </div>

      <!-- Barra de Busca -->
      <div class="mb-5">
        <input 
          type="text" 
          class="form-control form-control-lg border-2 shadow-sm" 
          placeholder="Insira a especialidade médica" 
          style="border-radius: 8px; border-color: #eee; font-size: 1rem; padding: 15px 20px;"
        >
      </div>

      <!-- Carrossel Mais Populares -->
      <h5 class="fw-bold mb-3" style="font-size: 1.1rem;">Mais populares</h5>
      
      <div id="carouselPopulares" class="carousel slide mb-5" data-bs-ride="carousel" style="border-radius: 16px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">
        
        <!-- Indicadores (Bolinhas) -->
        <div class="carousel-indicators mb-2">
          <button type="button" data-bs-target="#carouselPopulares" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselPopulares" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselPopulares" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        
        <div class="carousel-inner">
          <!-- Slide 1 -->
          <div class="carousel-item active" style="height: 380px; background: url('./images/medica_tablet.png') center 20%/cover no-repeat;">
             <div class="d-flex h-100 align-items-center justify-content-end p-5" style="background: linear-gradient(to right, transparent 30%, rgba(0,0,0,0.8) 100%);">
                 <div class="text-end text-white" style="max-width: 400px;">
                     <h2 class="fw-bold mb-2">Exame de sangue</h2>
                     <p class="mb-4" style="font-size: 0.95rem; color: #ddd;">lorem ipsum dolor sit amet eda</p>
                     <button class="btn btn-light fw-bold px-4 py-2" style="border-radius: 8px; color: #333;">Agende sua consulta</button>
                 </div>
             </div>
          </div>
          
          <!-- Slide 2 -->
          <div class="carousel-item" style="height: 380px; background: url('./images/joelho.png') center 30%/cover no-repeat;">
             <div class="d-flex h-100 align-items-center justify-content-end p-5" style="background: linear-gradient(to right, transparent 30%, rgba(0,0,0,0.8) 100%);">
                 <div class="text-end text-white" style="max-width: 400px;">
                     <h2 class="fw-bold mb-2">Ortopedia</h2>
                     <p class="mb-4" style="font-size: 0.95rem; color: #ddd;">lorem ipsum dolor sit amet eda</p>
                     <button class="btn btn-light fw-bold px-4 py-2" style="border-radius: 8px; color: #333;">Agende sua consulta</button>
                 </div>
             </div>
          </div>
        </div>
        
        <!-- Controles -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselPopulares" data-bs-slide="prev" style="width: 80px;">
          <div class="custom-arrow">‹</div>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselPopulares" data-bs-slide="next" style="width: 80px;">
          <div class="custom-arrow">›</div>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- Categorias -->
      <h5 class="fw-bold mb-3" style="font-size: 1.1rem;">Categorias</h5>
      
      <div class="row g-4">
        
        <!-- Card 1: Ultrassom -->
        <div class="col-md-3">
          <div class="card h-100 border-0 shadow-sm loja-card" style="border-radius: 12px; overflow: hidden;">
            <img src="./images/ultrassom.png" class="card-img-top" alt="Ultrassom" style="height: 160px; object-fit: cover;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h6 class="fw-bold mb-0 text-dark">Ultrassom de Abdome</h6>
                <span style="color: #1565c0; font-size: 1.2rem; line-height: 1; cursor: pointer;">♡</span>
              </div>
              <p class="text-muted small mb-0">lorem ipsum</p>
            </div>
          </div>
        </div>
        
        <!-- Card 2: Mamografia -->
        <div class="col-md-3">
          <div class="card h-100 border-0 shadow-sm loja-card" style="border-radius: 12px; overflow: hidden;">
            <img src="./images/mamografia.png" class="card-img-top" alt="Mamografia" style="height: 160px; object-fit: cover;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h6 class="fw-bold mb-0 text-dark">Mamografia</h6>
                <span style="color: #1565c0; font-size: 1.2rem; line-height: 1; cursor: pointer;">♡</span>
              </div>
              <p class="text-muted small mb-0">lorem ipsum</p>
            </div>
          </div>
        </div>
        
        <!-- Card 3: Ortopedia -->
        <div class="col-md-3">
          <div class="card h-100 border-0 shadow-sm loja-card" style="border-radius: 12px; overflow: hidden;">
            <img src="./images/joelho.png" class="card-img-top" alt="Ortopedia" style="height: 160px; object-fit: cover;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h6 class="fw-bold mb-0 text-dark">Ortopedia</h6>
                <span style="color: #1565c0; font-size: 1.2rem; line-height: 1; cursor: pointer;">♡</span>
              </div>
              <p class="text-muted small mb-0">lorem ipsum</p>
            </div>
          </div>
        </div>
        
        <!-- Card 4: Exame de Sangue -->
        <div class="col-md-3">
          <div class="card h-100 border-0 shadow-sm loja-card" style="border-radius: 12px; overflow: hidden;">
            <img src="./images/medica_tablet.png" class="card-img-top" alt="Exame de Sangue" style="height: 160px; object-fit: cover;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h6 class="fw-bold mb-0 text-dark">Exame de Sangue</h6>
                <span style="color: #1565c0; font-size: 1.2rem; line-height: 1; cursor: pointer;">♡</span>
              </div>
              <p class="text-muted small mb-0">lorem ipsum</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  `;
}
