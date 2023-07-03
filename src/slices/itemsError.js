import { createSlice } from "@reduxjs/toolkit";

const itemsErrorSlice = createSlice({
    name: 'itemsError',
    initialState: {
        value: false
    },
    reducers: {
        itemsError(state, action) {
            state.value = action.payload;
        }
    }
});

export const { itemsError } = itemsErrorSlice.actions;
export default itemsErrorSlice.reducer;