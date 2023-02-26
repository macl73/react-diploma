import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        value: {id: 11, title: "Все"}
    },
    reducers: {
        category(state, action) {
            state.value = action.payload;
        }
    }
});

export const { category } = categorySlice.actions;
export default categorySlice.reducer;