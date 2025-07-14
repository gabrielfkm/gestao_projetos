// models/EventModel.js
const API_URL = "https://68742e5bdd06792b9c93509d.mockapi.io/project/api/eventos";

export class EventModel {
  static async getAll() {
    const res = await fetch(API_URL);
    return res.json();
  }

  static async create(evento) {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(evento),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.json();
  }

  static async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return res.json();
  }
}
