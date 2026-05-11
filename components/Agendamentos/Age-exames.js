let currentDate = new Date();

export function initAgendamento() {

  setupCalendar();

  setupHorarios();

  setupConfirmacao();

}

/* =========================
   CALENDÁRIO
========================= */

function setupCalendar() {

  renderCalendar();

  const prevBtn = document.querySelector(".calendar-prev");

  const nextBtn = document.querySelector(".calendar-next");

  if (prevBtn) {

    prevBtn.addEventListener("click", () => {

      currentDate.setMonth(
        currentDate.getMonth() - 1
      );

      renderCalendar();

    });

  }

  if (nextBtn) {

    nextBtn.addEventListener("click", () => {

      currentDate.setMonth(
        currentDate.getMonth() + 1
      );

      renderCalendar();

    });

  }

}

function renderCalendar() {

  const container = document.getElementById("calendar-days");

  const monthLabel = document.querySelector(".calendar-month");

  if (!container || !monthLabel) return;

  container.innerHTML = "";

  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  monthLabel.innerText = `${monthNames[month]} ${year}`;

  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1);

  // Último dia do mês
  const lastDay = new Date(year, month + 1, 0);

  const totalDays = lastDay.getDate();

  // Ajusta semana começando SEG
  let startDay = firstDay.getDay() - 1;

  if (startDay < 0) startDay = 6;

  // Espaços vazios
  for (let i = 0; i < startDay; i++) {

    const empty = document.createElement("div");

    empty.classList.add("calendar-empty");

    container.appendChild(empty);

  }

  // Dias
  for (let day = 1; day <= totalDays; day++) {

    const button = document.createElement("button");

    button.type = "button";

    button.innerText = day;

    button.classList.add(
      "calendar-day",
      "btn",
      "btn-light"
    );

    // Hoje
    const today = new Date();

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {

      button.classList.add(
        "active",
        "btn-primary"
      );

      button.classList.remove("btn-light");

    }

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".calendar-day")
        .forEach((d) => {

          d.classList.remove(
            "active",
            "btn-primary"
          );

          d.classList.add("btn-light");

        });

      button.classList.add(
        "active",
        "btn-primary"
      );

      button.classList.remove("btn-light");

    });

    container.appendChild(button);

  }

}

/* =========================
   HORÁRIOS
========================= */

function setupHorarios() {

  const horarios = document.querySelectorAll(".time-btn");

  horarios.forEach((btn) => {

    btn.addEventListener("click", () => {

      horarios.forEach((item) => {

        item.classList.remove(
          "active",
          "btn-primary"
        );

        item.classList.add(
          "btn-outline-secondary"
        );

      });

      btn.classList.add(
        "active",
        "btn-primary"
      );

      btn.classList.remove(
        "btn-outline-secondary"
      );

    });

  });

}

/* =========================
   CONFIRMAR
========================= */

function setupConfirmacao() {

  const confirmar = document.querySelector(".confirm-btn");

  if (!confirmar) return;

  confirmar.addEventListener("click", () => {

    const dia = document.querySelector(".calendar-day.active");

    const horario = document.querySelector(".time-btn.active");

    if (!dia || !horario) {

      alert("Selecione uma data e horário.");

      return;

    }

    const overlay = document.getElementById(
      "successOverlay"
    );

    overlay.classList.add("show");

    // Reseta tudo após animação
    setTimeout(() => {

      overlay.classList.remove("show");

      resetAgendamento();

    }, 2600);

  });

}