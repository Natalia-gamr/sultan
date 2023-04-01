import { configureStore } from '@reduxjs/toolkit';
import products from './ProductSlice';
import filters from './FilterSlice';
import cart from './CartSlice';

const stringMiddleware = () => (next: (arg0: { type: string; }) => any) => (action: { type: string; }) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: { products, filters, cart },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})


export default store