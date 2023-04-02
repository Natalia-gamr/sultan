import axios from "axios"
import { ProductModel } from "../../interfaces/product.interface"
import { productSlice } from "../../reducers/ProductSlice"
import { AppDispatch } from "../store"


export const fetchProduct = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productSlice.actions.fetching())
            const response = await axios.get<ProductModel[]>('https://my-json-server.typicode.com/Natalia-gamr/sultan/products')
            let local = localStorage.getItem('product')
            if (local !== null) {
                dispatch(productSlice.actions.fetchSucces(JSON.parse(local)))
            } else {
                dispatch(productSlice.actions.fetchSucces(response.data))
            }

        } catch (e) {
            dispatch(productSlice.actions.fetchError(e as Error))
        }
    }
}

