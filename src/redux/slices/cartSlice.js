// redux/slices/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.data.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload.id);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else if (item && item.qty === 1) {
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      }
    },
    // Tambahkan reducer ini untuk set cart dari localStorage
    setCartFromLocalStorage: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
