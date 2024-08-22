import { createSlice } from '@reduxjs/toolkit'

import { fetchPokemons, fetchPokemon } from './thunks'

import {
    IDLE_STATUS,
    LOADING_STATUS,
    READY_STATUS,
    ERROR_STATUS,
} from 'lib/constants/api'

export const name = 'pokemon'

export const initialState: PokemonReducerState = {
    pagination: {
        count: 0,
        offset: 0,
        limit: 0,
        next: null,
        filter: 'all',
    },
    data: [],
    selectedPokemons: [],
    status: IDLE_STATUS,
    error: undefined,
}

const pokemonSlice = createSlice({
    name,
    initialState,
    reducers: {
        setFilter(state, { payload }) {
            state.pagination.filter = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state, { meta }) => {
            state.error = undefined
            state.status = LOADING_STATUS
            state.pagination.offset = meta.arg.offset || state.pagination.offset
            state.pagination.limit = meta.arg.limit || state.pagination.limit
        })
        builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
            state.data = [...state.data, ...(payload.results || [])]
            state.pagination.count = payload.count || 0
            state.pagination.next = payload.next || null
            state.pagination.offset =
                state.pagination.offset + state.pagination.limit
            state.error = undefined
            state.status = READY_STATUS
        })
        builder.addCase(fetchPokemons.rejected, (state, { error }) => {
            state.error = error.message
            state.status = ERROR_STATUS
        })
        builder.addCase(fetchPokemon.pending, (state) => {
            state.error = undefined
            state.status = 'loading'
        })
        builder.addCase(fetchPokemon.fulfilled, (state, { payload }) => {
            // lets update the pokemon data if available
            // otherwise save it to a selectedPokemons array
            // this way we dont pollute the main pokemon data
            const index = state.data.findIndex((p) => p?.name === payload?.name)
            if (index !== -1) {
                state.data[index] = payload
            } else {
                state.selectedPokemons = [...state.selectedPokemons, payload]
            }
            state.error = undefined
            state.status = READY_STATUS
        })
        builder.addCase(fetchPokemon.rejected, (state, { error }) => {
            state.error = error.message
            state.status = ERROR_STATUS
        })
    },
})

export const pokemonSliceInitialState = {
    [name]: initialState,
}

export const pokemonSliceReducer = {
    [name]: pokemonSlice.reducer,
}

export const { setFilter } = pokemonSlice.actions

export default pokemonSlice.reducer
