import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../interfaces/product.interface';

interface CartState {
    totalPrice: 0
    items: ProductModel[]
}

const initialState: CartState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ProductModel>) {
            state.items.push(action.payload)
            state.totalPrice += +action.payload.price
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.barecode !== action.payload.barecode)
            state.totalPrice -= +action.payload.price
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;