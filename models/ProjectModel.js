// models/ProjectModel.js
const API_URL = "https://6873e2e0c75558e273558c87.mockapi.io/projeto/user";

export class ProjectModel {
  static async getAll() {
    const res = await fetch(API_URL);
    return res.json();
  }

  static async create(data) {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.json();
  }

  static async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    return res.json();
  }
}
