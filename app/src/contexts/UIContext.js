import { createContext, useReducer, useMemo, useContext } from "react";

const initialState = {
  displayModal: false,
  user: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.value,
      };
    }
  }
}

export const UIContext = createContext({});

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  const setUser = (value) => dispatch({ type: "SET_USER", value });

  const providerValue = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setUser,
    }),
    [state]
  );

  return (
    <UIContext.Provider value={providerValue}>{children}</UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
