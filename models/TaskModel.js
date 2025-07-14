// models/TaskModel.js
const API_URL = "https://68742e5bdd06792b9c93509d.mockapi.io/project/api/tarefas";

export class TaskModel {
  static async getAll() {
    const res = await fetch(API_URL);
    return res.json();
  }

  static async create(tarefa) {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(tarefa),
      headers: { "Content-Type": "application/json" }
    });
    return res.json();
  }

  static async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return res.json();
  }

  static async update(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    return res.json();
  }
}
