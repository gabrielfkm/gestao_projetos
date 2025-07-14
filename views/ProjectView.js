// views/ProjectView.js
export class ProjectView {
  static renderProjects(projects) {
    const container = document.querySelector("#lista-projetos");
    if (!container) return;

    container.innerHTML = "";

    projects.forEach(projeto => {
      const card = document.createElement("div");
      card.className = "projeto-card";
      card.innerHTML = `
        <h3>${projeto.nome}</h3>
        <p>${projeto.descricao}</p>
        <p><strong>Membros:</strong> ${projeto.membros}</p>
        <p><strong>Prioridade:</strong> ${projeto.prioridade}</p>
        <button class="btn-excluir" data-id="${projeto.id}">Excluir</button>
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
