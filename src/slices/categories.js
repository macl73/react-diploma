import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        value: []
    },
    reducers: {
        categories(state, action) {
            state.value = action.payload;
        }
    }
});


export const { categories } = categoriesSlice.actions;
export default categoriesSlice.reducer;