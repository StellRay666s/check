import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import menuSlice from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
  },
});
