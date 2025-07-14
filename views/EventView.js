// views/EventView.js
export class EventView {
  static renderCalendar(eventos, dataAtual, onClickDia) {
    const calendarEl = document.getElementById("calendar");
    const monthYearEl = document.getElementById("monthYear");
    if (!calendarEl || !monthYearEl) return;

    // Limpa o calendário
    calendarEl.innerHTML = "";

    const year = dataAtual.getFullYear();
    const month = dataAtual.getMonth();

    // Cabeçalho dias da semana - deve ser fixo, fora do grid de dias
    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    // Você pode criar um container separado para os dias da semana, ou colocar no CSS grid usando grid-template-rows, etc.
    // Aqui vamos criar um elemento separadamente para cabeçalho:
    let headerEl = document.getElementById("diasSemanaHeader");
    if (!headerEl) {
      headerEl = document.createElement("div");
      headerEl.id = "diasSemanaHeader";
      headerEl.style.display = "grid";
      headerEl.style.gridTemplateColumns = "repeat(7, 1fr)";
      headerEl.style.marginBottom = "10px";
      calendarEl.parentNode.insertBefore(headerEl, calendarEl);
    }
    headerEl.innerHTML = "";
    diasSemana.forEach(dia => {
      const diaEl = document.createElement("div");
      diaEl.className = "days-of-week";
      diaEl.textContent = dia;
      headerEl.appendChild(diaEl);
    });

    // Primeiro dia da semana no mês (0=domingo ... 6=sábado)
    const primeiroDia = new Date(year, month, 1).getDay();

    // Ajustar para segunda-feira = 0, domingo = 6
    // (se sua semana começa na segunda)
    let deslocamento = primeiroDia - 1;
    if (deslocamento < 0) deslocamento = 6;

    const ultimoDia = new Date(year, month + 1, 0).getDate();

    // Ajustar grid para 7 colunas
    calendarEl.style.display = "grid";
    calendarEl.style.gridTemplateColumns = "repeat(7, 1fr)";
    calendarEl.style.gap = "10px";

    // Criar divs vazias para deslocar o primeiro dia
    for (let i = 0; i < deslocamento; i++) {
      const empty = document.createElement("div");
      empty.className = "empty";
      calendarEl.appendChild(empty);
    }

    // Criar os dias do mês
    for (let dia = 1; dia <= ultimoDia; dia++) {
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

    // Atualiza o título do mês e ano
    const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    monthYearEl.textContent = `${nomesMeses[month]} ${year}`;
  }
}
