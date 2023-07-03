import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        value: []
    },
    reducers: {
        items: (state, action) => {
            state.value = action.payload;
        },
        addItems: (state, action) => {
            state.value = [...state.value, ...action.payload];
        }
    }
});

export const { items, addItems } = itemsSlice.actions;
export default itemsSlice.reducer;
