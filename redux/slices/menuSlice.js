import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: null,
  isActiveUnderMenu: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMainMenu(state, action) {
      state.isActive = action.payload;
    },
    setActiveUnderMenu(state, action) {
      state.isActiveUnderMenu = action.payload;
    },
  },
});

export const { setActiveMainMenu, setActiveUnderMenu } = menuSlice.actions;

export default menuSlice.reducer;
