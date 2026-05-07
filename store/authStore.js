/**
 * authStore.js
 * Gerencia o estado do fluxo de autenticação e os usuários cadastrados.
 * steps: 'email' | 'password' | 'register'
 */

const state = {
  step: "email",
  email: "",
  error: "",
  currentUser: null,
};

// Usuários persistidos no localStorage
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

const listeners = new Set();

export const authStore = {
  // ─── Leitura ────────────────────────────────────────────
  getState() {
    return { ...state };
  },

  // ─── Escrita ────────────────────────────────────────────
  setState(partial) {
    Object.assign(state, partial);
    listeners.forEach((fn) => fn({ ...state }));
  },

  // ─── Inscrição ──────────────────────────────────────────
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  // ─── Navegação ───────────────────────────────────────────
  setEmail(email) {
    this.setState({ email, error: "" });
  },

  goToStep(step) {
    this.setState({ step, error: "" });
  },

  setError(error) {
    this.setState({ error });
  },

  reset() {
    this.setState({ step: "email", email: "", error: "" });
  },

  // ─── Usuários ────────────────────────────────────────────
  emailExists(email) {
    return loadUsers().some((u) => u.email === email);
  },

  register({ name, email, password }) {
    const users = loadUsers();

    if (users.some((u) => u.email === email)) {
      this.setError("Este e-mail já está cadastrado.");
      return false;
    }

    users.push({ name, email, password });
    saveUsers(users);
    this.setState({ currentUser: { name, email }, error: "" });
    return true;
  },

  login({ email, password }) {
    const user = loadUsers().find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      this.setError("Senha incorreta.");
      return false;
    }

    this.setState({ currentUser: { name: user.name, email: user.email }, error: "" });
    return true;
  },

  logout() {
    this.setState({ currentUser: null });
    this.reset();
  },

  getCurrentUser() {
    return state.currentUser;
  },
};
