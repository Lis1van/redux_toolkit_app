import { createAsyncThunk } from '@reduxjs/toolkit';
import { POKEMON_LIST_URL } from 'lib/constants/api';

const fetchPokemonsByAbility = createAsyncThunk<
    Pokemon[],
    string,
    { rejectValue: Error }
>(
    'pokemon/fetchPokemonsByAbility',
    async (ability, { rejectWithValue }) => {
        try {
            const response: Response = await fetch(`${POKEMON_LIST_URL}/ability/${ability}`);

            if (response.status === 200) {
                const data = await response.json();
                return data.pokemon.map((p: any) => p.pokemon); // Извлекаем массив покемонов
            } else {
                throw new Error('Error fetching pokemons by ability');
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default fetchPokemonsByAbility;
