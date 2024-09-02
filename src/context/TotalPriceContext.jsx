import { createContext, useContext, useReducer } from "react";

const TotalPriceContext = createContext(null);

const TotalPriceDispathContext = createContext(null);

export const totalPriceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE": {
      return {
        total: action.payload.total,
      };
    }
    default: {
      throw Error("Unknown action " + action.type);
    }
  }
};

export function TotalPriceProvider({ children }) {
  const [totalPrice, dispatch] = useReducer(totalPriceReducer, { total: 0 });

  return (
    <TotalPriceContext.Provider value={totalPrice}>
      <TotalPriceDispathContext.Provider value={dispatch}>
        {children}
      </TotalPriceDispathContext.Provider>
    </TotalPriceContext.Provider>
  );
}

export function useTotalPrice() {
  return useContext(TotalPriceContext);
}

export function useTotalDispathPrice() {
  return useContext(TotalPriceDispathContext);
}
