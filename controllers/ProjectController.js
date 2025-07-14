// controllers/ProjectController.js
import { ProjectModel } from "../models/ProjectModel.js";
import { ProjectView } from "../views/ProjectView.js";

export class ProjectController {
  static async init() {
    await this.loadProjects();
    this.setupForm();
    ProjectView.bindDeleteEvents(async (id) => {
      await ProjectModel.delete(id);
      await this.loadProjects();
    });
  }

  static async loadProjects() {
    const projects = await ProjectModel.getAll();
    ProjectView.renderProjects(projects);
  }

  static setupForm() {
    const form = document.getElementById("form-projeto");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        nome: form.nome.value,
        inicio: form.inicio.value,
        fim: form.fim.value,
        tarefas: form.tarefas.checked,
        membros: form.membros.value,
        prioridade: form.prioridade.value
      };

      await ProjectModel.create(data);
      await this.loadProjects();
      form.reset();

      const modal = document.getElementById("projectModal");
      if (modal) modal.style.display = "none";
    });
  }
          }
