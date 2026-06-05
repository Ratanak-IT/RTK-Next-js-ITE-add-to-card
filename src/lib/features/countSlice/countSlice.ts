import { createSlice } from "@reduxjs/toolkit";

// create countslice
const countSlice = createSlice({
  name: "count",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload;
    },
    decrement: (state, action) => {
      state.value -= action.payload;
    },
    resetValue: (state, action) => {
      state.value = action.payload;
    },
    initializeCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, resetValue, initializeCount } = countSlice.actions;
export default countSlice.reducer;
