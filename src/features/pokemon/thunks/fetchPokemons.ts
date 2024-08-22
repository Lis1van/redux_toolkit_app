import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_LIST_URL } from 'lib/constants/api'

const fetchPokemons = createAsyncThunk<
    {
        count: number
        next: string | null
        results: Pokemon[]
    },
    { offset?: number | null; limit?: number },
    {
        rejectValue: Error
    }
>(
    'pokemon/fetchPokemons',
    async ({ offset, limit = 20 } = {}, { getState, rejectWithValue }) => {
        try {
            const state: any = getState()

            // pull offset from state if not provided
            const offsetToUse = offset || state?.pokemon?.pagination?.offset

            const response = await fetch(
                `${POKEMON_LIST_URL}?offset=${offsetToUse}&limit=${limit}`
            )

            if (response.status === 200) {
                const { count, results, next } = await response.json()

                return {
                    count,
                    results,
                    next,
                }
            } else {
                throw new Error('Error fetching pokemons')
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export default fetchPokemons
