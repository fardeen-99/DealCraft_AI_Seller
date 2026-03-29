import { createSlice } from "@reduxjs/toolkit";


const gameSlice = createSlice({
    name: "game",
    initialState: {
        loading: false,
        leaderboard: [],
        error: null,
        messages: [],
        products: [],

    },
    reducers: {
        setloading: (state, action) => {
            state.loading = action.payload;
        },
        setleaderboard: (state, action) => {
            state.leaderboard = action.payload;
        },
        seterror: (state, action) => {
            state.error = action.payload;
        },
        setmessages: (state, action) => {
            state.messages = action.payload;
        },
        setproducts: (state, action) => {
            state.products = action.payload;
        }
    }

})

export const { setloading, setleaderboard, seterror, setmessages, setproducts } = gameSlice.actions;

export default gameSlice.reducer;