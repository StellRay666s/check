import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import menuSlice from "./slices/menuSlice";
import currentMatchesSlice from "./slices/currentMatchesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    match: currentMatchesSlice,
  },
});
