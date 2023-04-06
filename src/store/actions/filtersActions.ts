import axios from "axios"
import { FilterModel } from "../../interfaces/filter.interface"
import { filterSlice } from "../../reducers/FilterSlice"
import { AppDispatch } from "../store"

export const fetchFilters = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(filterSlice.actions.fetching())
            const response = await axios.get<FilterModel[]>('https://my-json-server.typicode.com/Natalia-gamr/sultan/filter')
            dispatch(filterSlice.actions.fetchSuccess(response.data))
        } catch (e) {
            dispatch(filterSlice.actions.fetchError(e as Error))
        }
    }
}

