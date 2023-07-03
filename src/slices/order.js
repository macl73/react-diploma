import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        value: []
    },
    reducers: {
        order: (state, action) => {
            state.value = [...state.value, action.payload];
        },
        existedOrder: (state, action) => {
            state.value = [...state.value.filter(item => (item.id + item.size) !== (action.payload.id + action.payload.size)), action.payload];
        },
        savedOrder: (state) => {
            state.value = JSON.parse(localStorage.cart);
        },
        eraseOrder: (state) => {
            state.value = [];
        },
        deleteFromOrder: (state, action) => {
            state.value = [...state.value.filter(item => item.id !== action.payload.id)];
        },
    }
});

export const { savedOrder, order, existedOrder, eraseOrder, deleteFromOrder } = orderSlice.actions;
export default orderSlice.reducer;
