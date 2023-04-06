import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductModel } from '../interfaces/product.interface';
import { calcTotalPrice } from '../utils/calcTotalPrice';

export interface CartState {
    totalPrice: number
    totalCount: number
    items: ProductModel[]
}

const initialState: CartState = {
    totalPrice: 0,
    totalCount: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ProductModel>) {
            const findItem = state.items.find((obj) => obj.barecode === action.payload.barecode);

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = state.items.reduce((sum: number, item: any) => sum + item.count, 0)
        },
        minusItem(state, action: PayloadAction<ProductModel>) {
            const findItem = state.items.find((obj) => obj.barecode === action.payload.barecode);

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = state.items.reduce((sum: number, item: any) => sum + item.count, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.barecode !== action.payload.barecode)
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = state.items.reduce((sum: number, item: any) => sum + item.count, 0)

        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        }
    }
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;