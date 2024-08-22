import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_GENERATIONS_URL } from 'lib/constants/api'

const fetchGeneration = createAsyncThunk<
    Generation,
    string | number,
    {
        rejectValue: Error
    }
>('pokemon/fetchGeneration', async (id, { getState, rejectWithValue }) => {
    try {
        if (!id) {
            throw new Error('Invalid id')
        }

        // check that the generation is not already in state
        // we can check by checking that the object has an id
        const state: any = getState()

        const generation = state?.generations?.data[id]

        const generationExists = generation?.id

        if (generationExists) {
            return generation
        }

        const response = await fetch(`${POKEMON_GENERATIONS_URL}/${id}`)

        if (response.status === 200) {
            const data = await response.json()

            return data
        } else {
            throw new Error('Error fetching generation')
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default fetchGeneration
