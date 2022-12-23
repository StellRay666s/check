import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMatches = createAsyncThunk("match/fetchMatches", async () => {
    const response = await axios.get(
        "http://localhost:8000/getTodaMatch",
    );
    return response.data.todayFootball
});

const initialState = {
    todayFootball: [],
};

export const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMatches.pending]: (state) => {
            state = [];
        },
        [fetchMatches.fulfilled]: (state, action) => {
            state.todayFootball = action.payload;
        },
        [fetchMatches.rejected]: (state) => {
            state = [];
        },
    },
});

export default matchesSlice.reducer;
