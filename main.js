import { AuthController } from './controllers/AuthController.js';
import { ProjectController } from './controllers/ProjectController.js';
import { TaskController } from './controllers/TaskController.js';
import { EventController } from './controllers/EventController.js';

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("usuarioLogado");
  const paginaAtual = window.location.pathname;
  const paginaPublica = paginaAtual.includes("/pages/login.html");

  if (!user && !paginaPublica) {
    window.location.href = "login.html";
  }

  if (user && paginaPublica) {
    window.location.href = "projetos.html";
  }

  const currentPage = window.location.pathname;

  if (currentPage.includes("/pages/login.html")) {
    AuthController.init();
  } else if (currentPage.includes("/pages/projetos.html")) {
    ProjectController.init();
  } else if (currentPage.includes("/pages/tarefas.html")) {
    TaskController.init();
  } else if (currentPage.includes("/pages/agenda.html")) {
    EventController.init();
  } else if (currentPage.includes("/pages/projeto.html")) {
    TaskController.init();
  }

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogado");
      window.location.href = "login.html";
    });
  }
});
