// controllers/AuthController.js
import { UserModel } from "../models/UserModel.js";
import { AuthView } from "../views/AuthView.js";

export class AuthController {
  static init() {
    AuthView.bindFormEvents(this.handleLogin, this.handleRegister);
    AuthView.bindToggleButtons();
  }

  static async handleLogin(email, senha) {
    const usuarios = await UserModel.getAll();
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
      window.location.href = "projetos.html";
    } else {
      AuthView.showMessage("Credenciais inválidas", "error");
    }
  }

  static async handleRegister(data) {
    const usuarios = await UserModel.getAll();
    const existe = usuarios.some(u => u.email === data.email);

    if (existe) {
      AuthView.showMessage("Usuário já cadastrado", "error");
      return;
    }

    await UserModel.create(data);
    AuthView.showMessage("Cadastro realizado! Faça login.", "success");
    AuthView.toggleForms();
  }
        }
