import axios from "axios"
import { FilterModel } from "../../interfaces/filter.interface"
import { filterSlice } from "../../reducers/FilterSlice"
import { AppDispatch } from "../store"

export const fetchFilters = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(filterSlice.actions.fetching())
            const response = await axios.get<FilterModel[]>('http://localhost:3001/filter')
            dispatch(filterSlice.actions.fetchSucces(response.data))
        } catch (e) {
            dispatch(filterSlice.actions.fetchError(e as Error))
        }
    }
}

