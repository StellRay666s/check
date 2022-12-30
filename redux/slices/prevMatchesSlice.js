import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPrewMatch = createAsyncThunk("match/fetchPrewMatch", async () => {
    const response = await axios.get(
        `http://localhost:8000/getPrewsMatchss`,
    );


    return response.data

});



const initialState = {
    prevMatches: [],
};

export const prevMatchesSlice = createSlice({
    name: "prevMacthes",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPrewMatch.pending]: (state) => {
            state = [];
        },
        [fetchPrewMatch.fulfilled]: (state, action) => {
            state.prevMatches = action.payload;
        },
        [fetchPrewMatch.rejected]: (state) => {
            state = [];
        },
    }
});

export const { sda } = prevMatchesSlice.actions;

export default prevMatchesSlice.reducer;
