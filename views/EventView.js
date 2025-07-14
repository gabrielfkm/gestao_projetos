// views/EventView.js
export class EventView {
  static renderEvents(eventos) {
    const container = document.querySelector("#eventos-container");
    if (!container) return;

    container.innerHTML = "";

    if (eventos.length === 0) {
      container.innerHTML = "<p>Nenhum evento para exibir.</p>";
      return;
    }

    eventos.forEach(ev => {
      const item = document.createElement("div");
      item.className = "evento-card";
      item.innerHTML = `
        <strong>${ev.titulo}</strong> - ${ev.data}
        <button class="btn-remover-evento" data-id="${ev.id}">Remover</button>
      `;
      container.appendChild(item);
    });
  }

  static bindDeleteEvents(callback) {
    document.addEventListener("click", e => {
      if (e.target.classList.contains("btn-remover-evento")) {
        const id = e.target.dataset.id;
        callback(id);
      }
    });
  }
}
