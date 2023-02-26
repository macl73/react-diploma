import { createSlice } from "@reduxjs/toolkit";

const addMoreSlice = createSlice({
    name: 'addMore',
    initialState: {
        value: 6
    },
    reducers: {
        addMore(state, action) {
            state.value = action.payload;
        }
    }
});


export const { addMore } = addMoreSlice.actions;
export default addMoreSlice.reducer;