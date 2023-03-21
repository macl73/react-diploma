import { createSlice } from "@reduxjs/toolkit";

const searchInputSlice = createSlice({
    name: 'searchInput',
    initialState: {
        value: ""
    },
    reducers: {
        searchInput(state, action) {
            state.value = action.payload;
        }
    }
});


export const { searchInput } = searchInputSlice.actions;
export default searchInputSlice.reducer;