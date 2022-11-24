import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeagues = createAsyncThunk("match/fetchLeagues", async () => {
  const response = await axios.get(
    "https://flashlive-sports.p.rapidapi.com/v1/tournaments/list",
    {
      params: { locale: "ru_RU", sport_id: "1" },
      headers: {
        "X-RapidAPI-Key": "be050b25e5msh6c1665177826c1cp187ca3jsn813ff1055e41",
        "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
      },
    }
  );
  return response.data.DATA.filter(
    (item) =>
      (item.LEAGUE_NAME === "Лига А") & (item.COUNTRY_NAME === "Австралия") ||
      (item.LEAGUE_NAME === "Бундеслига") & (item.COUNTRY_NAME === "Австрия") ||
      (item.LEAGUE_NAME === "Вторая лига") &
        (item.COUNTRY_NAME === "Австрия") ||
      (item.LEAGUE_NAME === "Премьер-лига") &
        (item.COUNTRY_NAME === "Англия") ||
      (item.LEAGUE_NAME === "Чемпионшип") & (item.COUNTRY_NAME === "Англия") ||
      (item.LEAGUE_NAME === "Лига Професиональ") &
        (item.COUNTRY_NAME === "Аргентина") ||
      (item.LEAGUE_NAME === "Высшая лига") &
        (item.COUNTRY_NAME === "Бельгия") ||
      (item.LEAGUE_NAME === "Чемпионат Бразилии") &
        (item.COUNTRY_NAME === "Бразилия") ||
      (item.LEAGUE_NAME === "Чемпионат Бразилии В") &
        (item.COUNTRY_NAME === "Бразилия") ||
      (item.LEAGUE_NAME === "Бундеслига") &
        (item.COUNTRY_NAME === "Германия") ||
      (item.LEAGUE_NAME === "Вторая Бундеслига") &
        (item.COUNTRY_NAME === "Германия") ||
      (item.LEAGUE_NAME === "Суперлига") & (item.COUNTRY_NAME === "Греция") ||
      (item.LEAGUE_NAME === "Суперлига") & (item.COUNTRY_NAME === "Дания") ||
      (item.LEAGUE_NAME === "Примера") & (item.COUNTRY_NAME === "Испания") ||
      (item.LEAGUE_NAME === "Сегунда") & (item.COUNTRY_NAME === "Испания") ||
      (item.LEAGUE_NAME === "Серия А") & (item.COUNTRY_NAME === "Италия") ||
      (item.LEAGUE_NAME === "Серия В") & (item.COUNTRY_NAME === "Италия") ||
      (item.LEAGUE_NAME === "Суперлига") & (item.COUNTRY_NAME === "Китай") ||
      (item.LEAGUE_NAME === "Лига MX") & (item.COUNTRY_NAME === "Мексика") ||
      (item.LEAGUE_NAME === "Высшая лига") &
        (item.COUNTRY_NAME === "Нидерланды") ||
      (item.LEAGUE_NAME === "Первый дивизион") &
        (item.COUNTRY_NAME === "Нидерланды") ||
      (item.LEAGUE_NAME === "Премьер-лига") &
        (item.COUNTRY_NAME === "Польша") ||
      (item.LEAGUE_NAME === "Суперлига") & (item.COUNTRY_NAME === "Сербия") ||
      (item.LEAGUE_NAME === "Первая лига") &
        (item.COUNTRY_NAME === "Словакия") ||
      (item.LEAGUE_NAME === "Первая лига") &
        (item.COUNTRY_NAME === "Словения") ||
      (item.LEAGUE_NAME === "МЛС") & (item.COUNTRY_NAME === "США") ||
      (item.LEAGUE_NAME === "Суперлига") & (item.COUNTRY_NAME === "Турция") ||
      (item.LEAGUE_NAME === "Первая лига") &
        (item.COUNTRY_NAME === "Франция") ||
      (item.LEAGUE_NAME === "Вторая лига") &
        (item.COUNTRY_NAME === "Франция") ||
      (item.LEAGUE_NAME === "HNL") & (item.COUNTRY_NAME === "Хорватия") ||
      (item.LEAGUE_NAME === "Первая лига") & (item.COUNTRY_NAME === "Чехия") ||
      (item.LEAGUE_NAME === "Второй дивизион") &
        (item.COUNTRY_NAME === "Чехия") ||
      (item.LEAGUE_NAME === "Суперлига") &
        (item.COUNTRY_NAME === "Швейцария") ||
      (item.LEAGUE_NAME === "Первая лига") &
        (item.COUNTRY_NAME === "Швейцария") ||
      (item.LEAGUE_NAME === "Высшая лига") & (item.COUNTRY_NAME === "Швеция") ||
      (item.LEAGUE_NAME === "Первая лига") & (item.COUNTRY_NAME === "Швеция") ||
      (item.LEAGUE_NAME === "Премьер-лига") &
        (item.COUNTRY_NAME === "Шотландия") ||
      (item.LEAGUE_NAME === "К-Лига 1") &
        (item.COUNTRY_NAME === "Южная Корея") ||
      (item.LEAGUE_NAME === "Лига Джей-1") & (item.COUNTRY_NAME === "Япония") ||
      (item.LEAGUE_NAME === "Высший дивизион") & (item.COUNTRY_NAME === "Чили")
  );
});

const initialState = {};

export const leaguesSlice = createSlice({
  name: "leag",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLeagues.pending]: (state) => {
      state = [];
    },
    [fetchLeagues.fulfilled]: (state, action) => {
      state.leag = action.payload;
    },
    [fetchLeagues.rejected]: (state) => {
      state = [];
    },
  },
});

export default leaguesSlice.reducer;
