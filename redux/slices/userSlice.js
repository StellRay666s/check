import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    lastname: "",
    phone: null,
    email: "",
    tariffs: 1,
  },
  isAuth: true,
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
      (state.user = []), (state.isAuth = false);
    },
    switchTariffs(state, action) {
      state.user.tariffs = action.payload;
    },
  },
});

export const { setUser, clearUser, switchTariffs } = userSlice.actions;

export default userSlice.reducer;
