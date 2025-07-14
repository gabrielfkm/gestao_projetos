// controllers/TaskController.js
import { TaskModel } from "../models/TaskModel.js";
import { TaskView } from "../views/TaskView.js";

export class TaskController {
  static projetoId = null;
  static projetoData = null;
  static tarefas = [];

  static async init() {
    this.projetoId = this.getProjetoIdFromURL();
    if (!this.projetoId) {
      alert("Projeto não encontrado.");
      window.location.href = "projetos.html";
      return;
    }

    await this.carregarProjeto();
    await this.carregarTarefas();
    this.bindForm();
  }

  static getProjetoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  static async carregarProjeto() {
    const res = await fetch(`https://6873e2e0c75558e273558c87.mockapi.io/projeto/user/${this.projetoId}`);
    if (!res.ok) {
      alert("Projeto não encontrado.");
      window.location.href = "projetos.html";
      return;
    }

    this.projetoData = await res.json();

    document.getElementById("projetoNome").textContent = this.projetoData.nome;
    document.getElementById("projetoDatas").textContent = `${this.projetoData.inicio} a ${this.projetoData.fim}`;
    document.getElementById("projetoMembros").textContent = this.projetoData.membros || "Sem membros informados";
  }

  static async carregarTarefas() {
    const all = await TaskModel.getAll();
    this.tarefas = all.filter(t => t.projetoId === this.projetoId);
    TaskView.renderTasks(this.tarefas, this.toggleTarefa.bind(this), this.removerTarefa.bind(this));
  }

  static bindForm() {
    const form = document.getElementById("formTarefa");
    if (!form) return;

    form.onsubmit = async (e) => {
      e.preventDefault();
      const descricao = form.descricao.value.trim();
      if (!descricao) return;

      await TaskModel.create({
        descricao,
        concluida: false,
        projetoId: this.projetoId
      });

      form.reset();
      await this.carregarTarefas();
    };
  }

  static async removerTarefa(id) {
    await TaskModel.delete(id);
    await this.carregarTarefas();
  }

  static async toggleTarefa(tarefa) {
    await TaskModel.update(tarefa.id, {
      ...tarefa,
      concluida: !tarefa.concluida
    });
    await this.carregarTarefas();
  }
  }
