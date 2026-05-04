/**
 * Mini Store — inspirado no Redux
 * Gerencia estado global com suporte a subscribe/dispatch
 */
export function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((fn) => fn(state));
  }

  /**
   * Inscreve uma função para ser chamada sempre que o estado mudar.
   * Retorna uma função para cancelar a inscrição.
   */
  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  // Inicializa o estado
  dispatch({ type: "@@INIT" });

  return { getState, dispatch, subscribe };
}
