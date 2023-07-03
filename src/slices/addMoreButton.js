import { createSlice } from "@reduxjs/toolkit";

const addMoreButtonSlice = createSlice({
    name: 'addMoreButton',
    initialState: {
        value: false
    },
    reducers: {
        addMoreButton(state, action) {
            state.value = action.payload;
        }
    }
});

export const { addMoreButton } = addMoreButtonSlice.actions;
export default addMoreButtonSlice.reducer;