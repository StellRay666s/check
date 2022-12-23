import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeagues = createAsyncThunk("match/fetchLeagues", async () => {
  const response = await axios.get(
    "http://localhost:8000/getLeag",
  );
  return response.data
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
