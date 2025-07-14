import { AuthController } from './controllers/AuthController.js';
import { ProjectController } from './controllers/ProjectController.js';
import { TaskController } from './controllers/TaskController.js';
import { EventController } from './controllers/EventController.js';

const currentPage = window.location.pathname;

if (currentPage.includes("/pages/login.html")) {
  AuthController.init();
} else if (currentPage.includes("/pages/projetos.html")) {
  ProjectController.init();
} else if (currentPage.includes("/pages/tarefas.html")) {
  TaskController.init();
} else if (currentPage.includes("/pages/agenda.html")) {
  EventController.init();
}
