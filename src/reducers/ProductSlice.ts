import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterModel } from '../interfaces/filter.interface';
import { ProductModel } from '../interfaces/product.interface'


export interface ProductState {
    products: ProductModel[]
    productsContainer: ProductModel[]
    isLoadingProducts: boolean
    errorProducts: string
    filterSidebar: {
        items: string[]
        minPrice: number
        maxPrice: number
    }
}

const initialState: ProductState = {
    products: [],
    productsContainer: [],
    isLoadingProducts: false,
    errorProducts: '',
    filterSidebar: {
        items: [],
        minPrice: 0,
        maxPrice: 0

    }
}

export interface FilterSidebar {
    items: string[]
    minPrice: number
    maxPrice: number
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetching(state) {
            state.isLoadingProducts = true
        },
        fetchSuccess(state, action: PayloadAction<ProductModel[]>) {
            state.isLoadingProducts = false
            state.products = action.payload
            state.productsContainer = action.payload
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.isLoadingProducts = false
            state.errorProducts = action.payload.message
        },
        filter(state, action: PayloadAction<FilterModel>) {
            state.products = state.productsContainer
                .filter(a => a.care.includes(action.payload.name))
        },
        filterSidebar(state, action) {
            state.filterSidebar.minPrice = action.payload.minPrice
            state.filterSidebar.maxPrice = action.payload.maxPrice

            if (action.payload.items.length !== 0) {
                state.filterSidebar.items = action.payload.items

                state.products = state.productsContainer
                    .filter(a => (state.filterSidebar.items.includes(a.brand) ||
                        state.filterSidebar.items.includes(a.manufacture)))
                    .filter(a => (+a.price >= action.payload.minPrice))
                    .filter(a => (+a.price <= action.payload.maxPrice))
            } else {
                state.filterSidebar.items = []

                state.products = state.productsContainer
                    .filter(a => (+a.price >= action.payload.minPrice))
                    .filter(a => (+a.price <= action.payload.maxPrice))
            }
        },
        deleteFilterSidebar(state, action) {
            state.filterSidebar.items = []
            state.products = state.productsContainer
        }
    }
})


export default productSlice.reducer;