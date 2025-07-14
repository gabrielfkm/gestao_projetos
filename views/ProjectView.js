// views/ProjectView.js
export class ProjectView {
  static renderProjects(projects) {
    const container = document.getElementById("lista-projetos");
    if (!container) return;

    container.innerHTML = "";

    if (projects.length === 0) {
      container.innerHTML = "<p id='emptyMessage'>Nenhum projeto adicionado ainda.</p>";
      return;
    }

    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "projeto-card";
      card.innerHTML = `
        <h3>${p.nome}</h3>
        <p><strong>Início:</strong> ${p.inicio} | <strong>Fim:</strong> ${p.fim}</p>
        <p><strong>Tarefas:</strong> ${p.tarefas ? "Sim" : "Não"}</p>
        <p><strong>Membros:</strong> ${p.membros}</p>
        <p><strong>Prioridade:</strong> ${p.prioridade}</p>
        <button class="btn-excluir" data-id="${p.id}">Excluir</button>
      `;
      container.appendChild(card);
    });
  }

  static bindDeleteEvents(callback) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-excluir")) {
        const id = e.target.dataset.id;
        callback(id);
      }
    });
  }
}
