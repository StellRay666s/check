import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentMatch = createAsyncThunk(
  "match/fetchCurrentMatch",
  async (params) => {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/events/data",
      {
        params: { event_id: 10533382 },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    return response.data.data;
  }
);

const initialState = {};

export const currentMatchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrentMatch.pending]: (state) => {
      state = [];
      state.status = "loading";
    },
    [fetchCurrentMatch.fulfilled]: (state, action) => {
      state.match = action.payload;
      state.status = "loaded";
    },
    [fetchCurrentMatch.rejected]: (state) => {
      state = [];
      state.status = "error";
    },
  },
});

export default currentMatchSlice.reducer;
