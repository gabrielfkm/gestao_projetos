// views/EventView.js
export class EventView {
  static renderCalendar(eventos, dataAtual, onClickDia) {
    const calendarEl = document.getElementById("calendar");
    const monthYearEl = document.getElementById("monthYear");

    if (!calendarEl || !monthYearEl) return;

    calendarEl.innerHTML = "";

    const year = dataAtual.getFullYear();
    const month = dataAtual.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    diasSemana.forEach(dia => {
      const diaEl = document.createElement("div");
      diaEl.className = "days-of-week";
      diaEl.textContent = dia;
      calendarEl.appendChild(diaEl);
    });

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.className = "empty";
      calendarEl.appendChild(empty);
    }

    for (let dia = 1; dia <= lastDate; dia++) {
      const dataStr = `${year}-${month + 1}-${dia}`;
      const diaEl = document.createElement("div");
      diaEl.className = "day";
      diaEl.textContent = dia;

      const evento = eventos.find(ev => ev.data === dataStr);
      if (evento) {
        const span = document.createElement("div");
        span.className = "event";
        span.textContent = evento.descricao;
        diaEl.appendChild(span);

        if (/prazo|fim/i.test(evento.descricao)) {
          diaEl.classList.add("orange");
        } else {
          diaEl.classList.add("highlight");
        }

        diaEl.onclick = () => onClickDia(evento, dia);
      } else {
        diaEl.onclick = () => onClickDia(null, dia);
      }

      calendarEl.appendChild(diaEl);
    }

    const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    monthYearEl.textContent = `${nomesMeses[month]} ${year}`;
  }
  }
