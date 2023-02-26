import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        value: []
    },
    reducers: {
        order(state, action) {
            state.value = action.payload;
        }
    }
});

export const { order } = orderSlice.actions;
export default orderSlice.reducer;