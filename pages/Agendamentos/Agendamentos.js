import { Nav } from "../../components/Nav/Nav.js";
import { Header } from "../../components/Header/Header.js";

export async function Agendamentos() {
  const nav = await Nav();
  const header = await Header({ title: "Agendamentos", subtitle: "Escolha o exame, unidade, data e horário" });

  // Gera dias do mês atual
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const nomeMes = hoje.toLocaleString("pt-BR", { month: "long" });
  const nomeMesFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diaHoje = hoje.getDate();

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  let headerDias = diasSemana.map(d =>
    `<div class="text-center text-muted fw-semibold" style="font-size:0.75rem;">${d}</div>`
  ).join("");

  let celulas = "";
  for (let i = 0; i < primeiroDia; i++) celulas += `<div></div>`;
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const isHoje = dia === diaHoje;
    celulas += `
      <div
        onclick="window.selecionarDia(${dia}, this)"
        data-dia="${dia}"
        class="text-center rounded-circle d-flex align-items-center justify-content-center mx-auto"
        style="width:36px; height:36px; cursor:pointer; font-size:0.9rem;
               ${isHoje ? "background:#1565c0; color:#fff; font-weight:700;" : "color:#333;"}"
      >${dia}</div>
    `;
  }

  return `
    ${nav}
    ${header}
    <main class="container mt-5 mb-5">
      <div class="row g-4">

        <!-- Coluna esquerda: filtros -->
        <div class="col-md-3">
          <div class="card shadow-sm p-3 mb-3">
            <label class="form-label text-muted fw-semibold">Unidade</label>
            <select class="form-select">
              <option>Vila Olímpia - SP</option>
              <option>Paulista - SP</option>
              <option>Moema - SP</option>
              <option>Itaim Bibi - SP</option>
            </select>
          </div>
          <div class="card shadow-sm p-3">
            <label class="form-label text-muted fw-semibold">Exame</label>
            <select class="form-select" id="select-exame">
              <option>Eletrocardiograma (ECG)</option>
              <option>Ultrassom de Abdome</option>
              <option>Mamografia</option>
              <option>Exame de Sangue</option>
              <option>Ortopedia</option>
              <option>Raio-X</option>
            </select>
          </div>
          
          <!-- Orientações para o exame (conforme print) -->
          <div class="card shadow-sm p-3 mt-3">
            <p class="fw-bold mb-2" style="font-size:0.9rem;">Orientações para o exame:</p>
            <ul class="text-muted mb-2" style="font-size:0.8rem; padding-left:1.2rem; list-style-type: decimal;">
                <li>Não pratique exercícios físicos nas 2 horas que antecedem o exame;</li>
                <li>Não é necessário jejum;</li>
                <li>Evite cremes e óleos na pele;</li>
                <li>Use roupas confortáveis e de fácil acesso;</li>
                <li>Informe seus medicamentos;</li>
                <li>Chegue com 15 minutos de antecedência;</li>
                <li>Traga seus exames anteriores;</li>
            </ul>
            <p class="text-muted mb-0" style="font-size:0.8rem;">O exame é rápido, indolor e não emite radiação.</p>
            <p class="text-muted fw-semibold mt-2 mb-0" style="font-size:0.8rem;">Duração aproximada: 10 minutos.</p>
          </div>
        </div>

        <!-- Coluna direita: calendário e detalhes -->
        <div class="col-md-9">
          <div class="card shadow-sm p-4">

            <!-- Cabeçalho do calendário -->
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="fw-bold fs-5" id="mes-ano">${nomeMesFormatado} ${ano}</span>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary btn-sm" onclick="window.mesAnterior()">&#8249;</button>
                <button class="btn btn-outline-secondary btn-sm" onclick="window.proximoMes()">&#8250;</button>
              </div>
            </div>
            <p class="text-muted mb-3" id="exame-label" style="font-size:0.9rem;">Eletrocardiograma (ECG)</p>

            <!-- Grid do calendário -->
            <div data-calendario style="display:grid; grid-template-columns: repeat(7, 1fr); gap:6px; margin-bottom:20px;">
              ${headerDias}
              ${celulas}
            </div>

            <hr />

            <!-- Horário -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="fw-semibold text-muted">Horário</span>
              <input type="time" class="form-control" value="09:30" style="width:140px;" />
            </div>

            <!-- Presencial / Online -->
            <div class="btn-group w-100 mb-4" role="group">
              <button type="button" class="btn btn-outline-primary active" id="btn-presencial" onclick="window.selecionarModalidade('presencial')">Presencial</button>
              <button type="button" class="btn btn-outline-primary" id="btn-online" onclick="window.selecionarModalidade('online')">Online</button>
            </div>

            <!-- Médicos -->
            <p class="text-muted fw-semibold mb-2" style="font-size:0.85rem;">Médico(a) / Profissional de saúde</p>
            <div class="list-group list-group-flush mb-4">
              <button onclick="window.selecionarMedico(this)" class="list-group-item list-group-item-action fw-bold text-primary active-medico">Bianca Souza</button>
              <button onclick="window.selecionarMedico(this)" class="list-group-item list-group-item-action">Diego Marques</button>
              <button onclick="window.selecionarMedico(this)" class="list-group-item list-group-item-action">Igor Bittencourt</button>
              <button onclick="window.selecionarMedico(this)" class="list-group-item list-group-item-action">Raphael Gomes</button>
            </div>

            <button onclick="window.confirmarAgendamento()" class="btn btn-primary w-100 py-2 fw-bold">Confirmar Agendamento</button>
          </div>
        </div>

      </div>

      <!-- Próximos agendamentos -->
      <hr class="my-5" style="border-style: dashed;" />
      <h5 class="fw-bold mb-3">Próximos agendamentos</h5>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <p class="fw-bold text-primary mb-1">Eletrocardiograma</p>
            <p class="text-muted mb-1" style="font-size:0.85rem;">Bianca Souza</p>
            <p class="text-secondary" style="font-size:0.85rem;">Vila Olímpia • 09:30</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <p class="fw-bold text-primary mb-1">Ultrassom de Abdome</p>
            <p class="text-muted mb-1" style="font-size:0.85rem;">Richard</p>
            <p class="text-secondary" style="font-size:0.85rem;">Paulista • 14:00</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <p class="fw-bold text-primary mb-1">Mamografia</p>
            <p class="text-muted mb-1" style="font-size:0.85rem;">Igor Bittencourt</p>
            <p class="text-secondary" style="font-size:0.85rem;">Moema • 10:30</p>
          </div>
        </div>
      </div>
    </main>

    <script>
      (function() {
        window.selecionarDia = function(dia, el) {
          document.querySelectorAll('[data-dia]').forEach(d => {
            d.style.background = 'none';
            d.style.color = '#333';
            d.style.fontWeight = 'normal';
          });
          el.style.background = '#1565c0';
          el.style.color = '#fff';
          el.style.fontWeight = '700';
        };

        window.selecionarModalidade = function(modo) {
          const btnP = document.getElementById('btn-presencial');
          const btnO = document.getElementById('btn-online');
          if (modo === 'presencial') {
            btnP.classList.add('active');
            btnO.classList.remove('active');
          } else {
            btnO.classList.add('active');
            btnP.classList.remove('active');
          }
        };

        window.selecionarMedico = function(el) {
          document.querySelectorAll('[onclick*="selecionarMedico"]').forEach(b => {
            b.classList.remove('fw-bold', 'text-primary');
          });
          el.classList.add('fw-bold', 'text-primary');
        };

        window.confirmarAgendamento = function() {
          alert('Agendamento confirmado com sucesso!');
        };

        let mesAtual = new Date().getMonth();
        let anoAtual = new Date().getFullYear();

        function atualizarCalendario() {
          const nomeMes = new Date(anoAtual, mesAtual, 1).toLocaleString('pt-BR', { month: 'long' });
          document.getElementById('mes-ano').textContent =
            nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1) + ' ' + anoAtual;

          const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
          const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
          const hj = new Date();
          const diaHoje = (hj.getMonth() === mesAtual && hj.getFullYear() === anoAtual) ? hj.getDate() : -1;

          const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
          let html = dias.map(d =>
            '<div class="text-center text-muted fw-semibold" style="font-size:0.75rem;">' + d + '</div>'
          ).join('');

          for (let i = 0; i < primeiroDia; i++) html += '<div></div>';
          for (let dia = 1; dia <= diasNoMes; dia++) {
            const isHoje = dia === diaHoje;
            html += '<div onclick="window.selecionarDia(' + dia + ', this)" data-dia="' + dia + '"' +
              ' class="text-center rounded-circle d-flex align-items-center justify-content-center mx-auto"' +
              ' style="width:36px;height:36px;cursor:pointer;font-size:0.9rem;' +
              (isHoje ? 'background:#1565c0;color:#fff;font-weight:700;' : 'color:#333;') + '">' + dia + '</div>';
          }

          document.querySelector('[data-calendario]').innerHTML = html;
        }

        window.mesAnterior = function() {
          if (mesAtual === 0) { mesAtual = 11; anoAtual--; } else mesAtual--;
          atualizarCalendario();
        };
        window.proximoMes = function() {
          if (mesAtual === 11) { mesAtual = 0; anoAtual++; } else mesAtual++;
          atualizarCalendario();
        };

        // Sincroniza label do exame
        document.getElementById('select-exame')?.addEventListener('change', function() {
          document.getElementById('exame-label').textContent = this.value;
        });
      })();
    </script>
  `;
}