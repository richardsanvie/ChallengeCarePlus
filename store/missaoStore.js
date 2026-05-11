import { createStore } from "./store.js";

// ─── Estado inicial ───────────────────────────────────────
const initialState = {
  missoes: {
    agua: {
      concluida: false,
      slots: [
        [true, true, true, true, false],
        [true, true, true, false, false],
        [true, true, true, false, false],
      ],
      pontos: 200,
    },
  },
};

// ─── Reducer ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SLOT_AGUA": {
      const { slotIdx, itemIdx } = action.payload;
      const slots = state.missoes.agua.slots.map((row, si) =>
        si === slotIdx
          ? row.map((val, ii) => (ii === itemIdx ? !val : val))
          : row,
      );
      return {
        ...state,
        missoes: {
          ...state.missoes,
          agua: { ...state.missoes.agua, slots },
        },
      };
    }

    case "CONCLUIR_MISSAO_AGUA":
      return {
        ...state,
        missoes: {
          ...state.missoes,
          agua: { ...state.missoes.agua, concluida: true },
        },
      };

    case "RESETAR_MISSAO_AGUA":
      return {
        ...state,
        missoes: {
          ...state.missoes,
          agua: { ...initialState.missoes.agua, concluida: false },
        },
      };

    default:
      return state;
  }
}

// ─── Store singleton ─────────────────────────────────────
export const missaoStore = createStore(reducer, initialState);

// ─── Helpers ─────────────────────────────────────────────
export function getAguaState() {
  return missaoStore.getState().missoes.agua;
}

export function totalAtivos(slots) {
  return slots.flat().filter(Boolean).length;
}

export function metaBatida(slots) {
  // Meta: 10 de 15 copos (≥ 3L)
  return totalAtivos(slots) >= 10;
}

// ─── Actions ─────────────────────────────────────────────
export const missaoActions = {
  toggleSlot: (slotIdx, itemIdx) =>
    missaoStore.dispatch({
      type: "TOGGLE_SLOT_AGUA",
      payload: { slotIdx, itemIdx },
    }),
  concluir: () => missaoStore.dispatch({ type: "CONCLUIR_MISSAO_AGUA" }),
  resetar: () => missaoStore.dispatch({ type: "RESETAR_MISSAO_AGUA" }),
};
