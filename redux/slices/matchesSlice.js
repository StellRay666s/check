import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMatches = createAsyncThunk("match/fetchMatches", async () => {
    const { data } = await axios.get(
        `${process.env.URL}/getTodaMatch`,
    );

    const todayFootball = data.todayFootball
    return todayFootball
});

export const fetchMatchesHockey = createAsyncThunk("match/fetchMatchesHockey", async () => {
    const { data } = await axios.get(
        `${process.env.URL}/getTodaMatch`,
    );

    const todayHockey = data.todayHockey
    return todayHockey
});


// export const fetchMatchesHockey = createAsyncThunk("match/fetchMatchesHockey", async () => {
//     const response = await axios.get(
//         "http://localhost:8000/getTodaMatch",
//     );
//     return response.data.todayFootball
// });


const initialState = {
    todayFootball: [],
    todayHockey: []
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
        [fetchMatchesHockey.pending]: (state) => {
            state = [];
        },
        [fetchMatchesHockey.fulfilled]: (state, action) => {
            state.todayHockey = action.payload;
        },
        [fetchMatchesHockey.rejected]: (state) => {
            state = [];
        },
    },
});

export default matchesSlice.reducer;
