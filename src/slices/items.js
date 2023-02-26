import { createSlice } from "@reduxjs/toolkit";


const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        value: []
    },
    reducers: {
        items(state, action) {
            state.value = action.payload;
        }
    }
});


export const { items } = itemsSlice.actions;
export default itemsSlice.reducer;