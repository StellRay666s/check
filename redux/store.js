import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import menuSlice from "./slices/menuSlice";
import leagueSlice from "./slices/leagueSlice";
import { userInfo } from "./userInfo/reducer";
import matchesSlice from "./slices/matchesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    league: leagueSlice,
    userInfo,
    matches: matchesSlice
  },
});
