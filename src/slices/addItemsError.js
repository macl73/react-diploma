import { createSlice } from "@reduxjs/toolkit";

const addItemsErrorSlice = createSlice({
    name: 'addItemsError',
    initialState: {
        value: false
    },
    reducers: {
        addItemsError(state, action) {
            state.value = action.payload;
        }
    }
});

export const { addItemsError } = addItemsErrorSlice.actions;
export default addItemsErrorSlice.reducer;