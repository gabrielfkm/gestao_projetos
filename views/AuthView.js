// views/AuthView.js
export class AuthView {
  static showMessage(msg, type = "info") {
    const msgBox = document.getElementById("authMessage");
    if (!msgBox) return;

    msgBox.textContent = msg;
    msgBox.style.color = type === "error" ? "red" : "green";
  }

  static bindFormEvents(onLogin, onRegister) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    loginForm.onsubmit = e => {
      e.preventDefault();
      const email = loginForm.email.value;
      const senha = loginForm.senha.value;
      onLogin(email, senha);
    };

    registerForm.onsubmit = e => {
      e.preventDefault();
      const nome = registerForm.nome.value;
      const email = registerForm.email.value;
      const senha = registerForm.senha.value;
      onRegister({ nome, email, senha });
    };
  }

  static toggleForms() {
    const container = document.querySelector(".form-container");
    container.classList.toggle("active");
  }

  static bindToggleButtons() {
    document.getElementById("toRegister").onclick = this.toggleForms;
    document.getElementById("toLogin").onclick = this.toggleForms;
  }
}
