import { createSlice } from "@reduxjs/toolkit";

const addItemsLoaderSlice = createSlice({
    name: 'addItemsLoader',
    initialState: {
        value: false
    },
    reducers: {
        addItemsLoader(state, action) {
            state.value = action.payload;
        }
    }
});

export const { addItemsLoader } = addItemsLoaderSlice.actions;
export default addItemsLoaderSlice.reducer;