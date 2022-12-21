import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    lastname: "",
    phone: null,
    email: "",
    tariffs: [],
  },

  tariffs: [
    "Базовый",
    "Премиум",
    "Партнерский"
  ],

  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    clearUser(state) {
      (state.user = initialState), (state.isAuth = false);
    },
    switchTariffs(state, action) {
      state.tariffs = [action.payload]
    },
  },
});

export const { setUser, clearUser, switchTariffs } = userSlice.actions;

export default userSlice.reducer;
