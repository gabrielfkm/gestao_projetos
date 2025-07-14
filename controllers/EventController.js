// controllers/EventController.js
import { EventModel } from "../models/EventModel.js";
import { EventView } from "../views/EventView.js";

export class EventController {
  static eventos = [];
  static dataAtual = new Date();
  static eventoSelecionado = null;

  static async init() {
    await this.carregarEventos();
    this.bindUI();
  }

  static async carregarEventos() {
    this.eventos = await EventModel.getAll();
    EventView.renderCalendar(this.eventos, this.dataAtual, this.abrirModalEdicao.bind(this));
  }

  static bindUI() {
    document.getElementById("prevMonth").onclick = () => {
      this.dataAtual.setMonth(this.dataAtual.getMonth() - 1);
      this.carregarEventos();
    };

    document.getElementById("nextMonth").onclick = () => {
      this.dataAtual.setMonth(this.dataAtual.getMonth() + 1);
      this.carregarEventos();
    };

    document.getElementById("addEventBtn").onclick = () => {
      this.abrirModalEdicao(null);
    };

    document.getElementById("btnExcluir").onclick = async () => {
      if (this.eventoSelecionado) {
        await EventModel.delete(this.eventoSelecionado.id);
        this.fecharModal();
        await this.carregarEventos();
      }
    };

    const form = document.getElementById("form-evento");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const dia = parseInt(form.dia.value);
      const descricao = form.descricao.value.trim();

      if (!dia || !descricao) {
        alert("Preencha todos os campos.");
        return;
      }

      const dataFormatada = `${this.dataAtual.getFullYear()}-${this.dataAtual.getMonth() + 1}-${dia}`;

      if (this.eventoSelecionado) {
        await EventModel.delete(this.eventoSelecionado.id);
      }

      await EventModel.create({
        data: dataFormatada,
        descricao
      });

      this.fecharModal();
      await this.carregarEventos();
    };
  }

  static abrirModalEdicao(evento, dia) {
    const modal = document.getElementById("eventModal");
    const form = document.getElementById("form-evento");

    this.eventoSelecionado = evento || null;

    form.dia.value = dia || (evento ? parseInt(evento.data.split("-")[2]) : "");
    form.descricao.value = evento ? evento.descricao : "";

    modal.style.display = "block";
  }

  static fecharModal() {
    document.getElementById("eventModal").style.display = "none";
    this.eventoSelecionado = null;
  }
  }
