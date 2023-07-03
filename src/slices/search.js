import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: undefined
    },
    reducers: {
        search: (state, action) => {
            state.value = action.payload;
        },
        
        initialSearch: (state) => {
            state.value = undefined;
        }
    }
});

export const { search, initialSearch } = searchSlice.actions;
export default searchSlice.reducer;
