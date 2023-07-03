import { createSlice } from "@reduxjs/toolkit";

export const searchInputSlice = createSlice({
    name: 'searchInput',
    initialState: {
        value: ""
    },
    reducers: {
        searchInput: (state, action) => {
            state.value = action.payload;
        },

        initialSearchInput: (state) => {
            state.value = "";
        }
    }
});

export const { searchInput, initialSearchInput } = searchInputSlice.actions;
export default searchInputSlice.reducer;
