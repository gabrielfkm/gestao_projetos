// controllers/EventController.js
import { EventModel } from "../models/EventModel.js";
import { EventView } from "../views/EventView.js";

export class EventController {
  static async init() {
    await this.loadEvents();
    this.setupForm();
    EventView.bindDeleteEvents(async (id) => {
      await EventModel.delete(id);
      await this.loadEvents();
    });
  }

  static async loadEvents() {
    const eventos = await EventModel.getAll();
    EventView.renderEvents(eventos);
  }

  static setupForm() {
    const form = document.getElementById("form-evento");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const evento = {
        titulo: form.titulo.value,
        data: form.data.value
      };

      await EventModel.create(evento);
      await this.loadEvents();
      form.reset();

      const modal = document.getElementById("eventoModal");
      if (modal) modal.style.display = "none";
    });
  }
}
