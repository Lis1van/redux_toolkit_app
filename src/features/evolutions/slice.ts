import { createSlice } from '@reduxjs/toolkit'

import { fetchEvolutions } from './thunks'

import {
    IDLE_STATUS,
    LOADING_STATUS,
    READY_STATUS,
    ERROR_STATUS,
} from 'lib/constants/api'

export const name = 'evolutions'

export const initialState: EvolutionsReducerState = {
    data: [],
    status: IDLE_STATUS,
    error: undefined,
}

const evolutionsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEvolutions.pending, (state) => {
            state.error = undefined
            state.status = LOADING_STATUS
        })
        builder.addCase(fetchEvolutions.fulfilled, (state, { payload }) => {
            state.data = [...state.data, payload]
            state.error = undefined
            state.status = READY_STATUS
        })
        builder.addCase(fetchEvolutions.rejected, (state, { error }) => {
            state.error = error.message
            state.status = ERROR_STATUS
        })
    },
})

export const evolutionsSliceInitialState = {
    [name]: initialState,
}

export const evolutionsSliceReducer = {
    [name]: evolutionsSlice.reducer,
}

export default evolutionsSlice.reducer
