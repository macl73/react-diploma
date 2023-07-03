import { createSlice } from "@reduxjs/toolkit";

const itemsLoaderSlice = createSlice({
    name: 'itemsLoader',
    initialState: {
        value: false
    },
    reducers: {
        itemsLoader(state, action) {
            state.value = action.payload;
        }
    }
});

export const { itemsLoader } = itemsLoaderSlice.actions;
export default itemsLoaderSlice.reducer;