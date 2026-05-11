import { loadStyle } from "../../styles/loadStyle.js";

export async function Header({ title = "Meu Site", subtitle = "" } = {}) {
  loadStyle("./components/Header/Header.css");

  return `
      <header class="header-top d-flex align-items-center gap-3 mb-3 fu">
    <div class="me-auto">
      <div class="greeting">Olá, Fernando 👋</div>
      <div class="greeting-sub">Nível 4</div>
    </div>

    <div class="points-badge">
      <i class="bi bi-trophy-fill"></i>
      <div>
        <div style="font-size:18px; font-weight:900; line-height:1;">14</div>
        <div style="font-size:11px; color:#6b7280; font-weight:700;">Pontos</div>
      </div>
    </div>

    <div class="search-wrap">
      <i class="bi bi-search text-secondary"></i>
      <input type="text" placeholder="Buscar algo…">
    </div>

    <button class="notif-btn">
      <i class="bi bi-bell"></i>
      <span class="bdot">2</span>
    </button>

    <div class="avatar">
      <i class="bi bi-person-fill text-white fs-5"></i>
    </div>
    
  </header>

  <div class="row g-3 mb-3">

    <!-- Próximo compromisso -->
    <div class="col-12 col-md-4 col-xl-3 fu d1">
      <div class="card-appt">
        <div class="date-box">
          <div class="dn">SEG</div>
          <div class="dd">13</div>
        </div>
        <div class="flex-grow-1">
          <div style="font-size:11px; color:#6b7280; font-weight:600;">Próximo compromisso</div>
          <div class="fw-800" style="font-size:15px; margin-top:2px;">Exame de sangue</div>
        </div>
        <span class="tag tag-blue">13hrs</span>
      </div>
    </div>

    <!-- Hábitos -->
    <div class="col-6 col-md-2 fu d1">
      <div class="stat-card">
        <div class="stat-icon" style="background:var(--blue-pale);">
          <i class="bi bi-person-running" style="color:var(--blue);"></i>
        </div>
        <div class="flex-grow-1">
          <div class="stat-value">7</div>
          <div class="stat-label">Hábitos<br>concluídos</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" data-w="70%" style="width:0%; background:var(--blue);"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Exames -->
    <div class="col-6 col-md-2 fu d2">
      <div class="stat-card">
        <div class="stat-icon" style="background:var(--green-pale);">
          <i class="bi bi-clipboard2-check" style="color:var(--green);"></i>
        </div>
        <div class="flex-grow-1">
          <div class="stat-value">2</div>
          <div class="stat-label">Exames<br>pendentes</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" data-w="40%" style="width:0%; background:var(--green);"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dias consecutivos -->
    <div class="col-6 col-md-2 fu d3">
      <div class="stat-card">
        <div class="stat-icon" style="background:var(--orange-pale);">
          <i class="bi bi-fire" style="color:var(--orange);"></i>
        </div>
        <div class="flex-grow-1">
          <div class="stat-value">5</div>
          <div class="stat-label">Dias<br>consecutivos</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" data-w="50%" style="width:0%; background:var(--orange);"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nível -->
    <div class="col-6 col-md-2 fu d4">
      <div class="stat-card">
        <div class="stat-icon" style="background:var(--purple-pale);">
          <i class="bi bi-star-fill" style="color:var(--purple);"></i>
        </div>
        <div class="flex-grow-1">
          <div class="stat-value">4</div>
          <div class="stat-label">Nível<br>Muito bem!</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" data-w="80%" style="width:0%; background:var(--purple);"></div>
          </div>
        </div>
      </div>
    </div>

  </div><!-- /row stat cards -->

  
  `;
}

// export async function Content() {
//   const response = await fetch("./components/Content/Content.html");
//   return await response.text();
// }
