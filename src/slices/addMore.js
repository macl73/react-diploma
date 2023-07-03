import { createSlice } from "@reduxjs/toolkit";

const addMoreSlice = createSlice({
    name: 'addMore',
    initialState: {
        value: 6
    },
    reducers: {
        addMore: (state) => {
            state.value += 6;
        },
        addZero: (state) => {
            state.value = 6
        }
    }
});

export const { addMore, addZero } = addMoreSlice.actions;
export default addMoreSlice.reducer;
