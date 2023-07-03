import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        value: false
    },
    reducers: {
        searchBar(state, action) {
            state.value = action.payload;
        }
    }
});

export const { searchBar } = searchBarSlice.actions;
export default searchBarSlice.reducer;