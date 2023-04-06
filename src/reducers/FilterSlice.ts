import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterModel } from '../interfaces/filter.interface';

interface FilterState {
    filters: FilterModel[]
    isLoadingFilter: boolean,
    error: string
}

const initialState: FilterState = {
    filters: [],
    isLoadingFilter: false,
    error: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        fetching(state) {
            state.isLoadingFilter = true
        },
        fetchSuccess(state, action: PayloadAction<FilterModel[]>) {
            state.isLoadingFilter = false
            state.filters = action.payload
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.isLoadingFilter = false
            state.error = action.payload.message
        },
    }
})


export default filterSlice.reducer;