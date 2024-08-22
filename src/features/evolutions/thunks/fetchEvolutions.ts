import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_SPECIES_URL } from 'lib/constants/api'

const fetchEvolutions = createAsyncThunk<
    Evolution,
    number | null,
    {
        rejectValue: Error
    }
>('pokemon/fetchEvolutions', async (id, { rejectWithValue }) => {
    try {
        if (!id) {
            throw new Error('Invalid id')
        }

        const speciesResponse: Response = await fetch(`${POKEMON_SPECIES_URL}/${id}`)

        if (speciesResponse.status === 200) {
            const speciesData = await speciesResponse.json()

            const evolutionUrl = speciesData.evolution_chain.url

            const response = await fetch(evolutionUrl)

            if (response.status === 200) {
                const data = await response.json()

                return {
                    ...data,
                    id: speciesData.id,
                }
            } else {
                throw new Error('Error fetching pokemon evolutions')
            }
        } else {
            throw new Error('Error fetching pokemon species')
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default fetchEvolutions
