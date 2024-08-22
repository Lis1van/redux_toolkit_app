import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_GENERATIONS_URL } from 'lib/constants/api'

const fetchGenerations = createAsyncThunk<
    { results: { name: string }[]; count: number },
    void,
    {
        rejectValue: Error
    }
>('pokemon/fetchGenerations', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(POKEMON_GENERATIONS_URL)

        if (response.status === 200) {
            const data = await response.json()

            return data
        } else {
            throw new Error('Error fetching generations')
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default fetchGenerations
