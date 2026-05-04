import { createStore } from "./store.js";

// ─── Estado inicial ───────────────────────────────────────
const initialState = {
  user: { name: "Fernando", logado: true },
  contador: 0,
  carrinho: [],
  tema: "claro", // "claro" | "escuro"
};

// ─── Reducer ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENTAR":
      return { ...state, contador: state.contador + 1 };

    case "DECREMENTAR":
      return { ...state, contador: Math.max(0, state.contador - 1) };

    case "RESETAR_CONTADOR":
      return { ...state, contador: 0 };

    case "ADICIONAR_AO_CARRINHO":
      return { ...state, carrinho: [...state.carrinho, action.payload] };

    case "LIMPAR_CARRINHO":
      return { ...state, carrinho: [] };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "TOGGLE_TEMA":
      return { ...state, tema: state.tema === "claro" ? "escuro" : "claro" };

    default:
      return state;
  }
}

// ─── Store singleton ─────────────────────────────────────
export const store = createStore(reducer, initialState);

// ─── Action creators (opcional, mas organiza melhor) ──────
export const actions = {
  incrementar: () => store.dispatch({ type: "INCREMENTAR" }),
  decrementar: () => store.dispatch({ type: "DECREMENTAR" }),
  resetarContador: () => store.dispatch({ type: "RESETAR_CONTADOR" }),
  adicionarAoCarrinho: (item) =>
    store.dispatch({ type: "ADICIONAR_AO_CARRINHO", payload: item }),
  limparCarrinho: () => store.dispatch({ type: "LIMPAR_CARRINHO" }),
  setUser: (user) => store.dispatch({ type: "SET_USER", payload: user }),
  toggleTema: () => store.dispatch({ type: "TOGGLE_TEMA" }),
};
