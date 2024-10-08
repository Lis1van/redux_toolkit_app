import { createSelector } from '@reduxjs/toolkit'
import { IDLE_STATUS, LOADING_STATUS, READY_STATUS } from 'lib/constants/api'
import { unslug, getPokemonIdFromUrl } from 'lib/utils/strings'
import { selectGenerationsData } from 'features/generations'

const selectSelf = (state: { pokemon: PokemonReducerState }) => state['pokemon']

export const selectPokemonStatusIdle = createSelector(
    selectSelf,
    ({ status }) => status === IDLE_STATUS
)

export const selectPokemonStatusLoading = createSelector(
    selectSelf,
    ({ status }) => status === LOADING_STATUS
)

export const selectPokemonStatusReady = createSelector(
    selectSelf,
    ({ status }) => status === READY_STATUS
)

export const selectPokemonError = createSelector(
    selectSelf,
    ({ error }) => error
)

export const selectPokemonData = createSelector(
    selectSelf,
    ({ data }) => data || []
)

export const selectCount = createSelector(
    selectSelf,
    ({ pagination }) => pagination?.count || 0
)

export const selectFilter = createSelector(
    selectSelf,
    ({ pagination }) => pagination?.filter || 'all'
)

export const selectHasNext = createSelector(
    selectSelf,
    selectPokemonStatusIdle,
    selectPokemonData,
    ({ pagination }, isInit, data) =>
        pagination?.next !== null || isInit || !data.length
)

export const selectOffset = createSelector(
    selectSelf,
    ({ pagination }) => pagination?.offset || 0
)

export const selectSelectedPokemons = createSelector(
    selectSelf,
    ({ selectedPokemons }) => selectedPokemons
)

export const selectPokemonById = createSelector(
    selectPokemonData,
    selectSelectedPokemons,
    (_: any, id: string | null | undefined) => id,
    (data: Pokemon[], selectedPokemons: Pokemon[], id) => {
        if (!id) return null

        let foundPokemon: Pokemon | undefined | null

        const isMatch = (pokemon: Pokemon) =>

            pokemon?.id &&
            (pokemon.id === parseInt(id) ||
                pokemon.name === id.toLocaleLowerCase())

        if (!!selectedPokemons.length) {
            foundPokemon = selectedPokemons.find(isMatch)
        }

        if (!foundPokemon) {
            foundPokemon = data.find(isMatch)
        }

        return foundPokemon
    }
)

export const selectFilteredPokemon = createSelector(
    selectPokemonData,
    (_: any, filter: string) => filter,
    (data: Pokemon[], filter: string) => {
        if (!filter) return []

        const toSearch = filter.toLocaleLowerCase()

        return data.filter((pokemon: Pokemon) => {
            const pokemonName = (
                unslug(pokemon?.name) || ''
            ).toLocaleLowerCase()

            return (
                pokemonName &&
                pokemonName.includes(toSearch) &&
                pokemonName[0] === toSearch[0]
            )
        })
    }
)

export const selectPokemonListData = createSelector(
    selectFilter,
    selectPokemonData,
    selectGenerationsData,
    (filter: string, pokemonData: Pokemon[], generationsData: Generations) => {
        if (filter === 'all') return pokemonData

        const generation: Generation = generationsData[filter]

        if (!generation) return []

        const generationPokemon = [...generation.pokemon_species].sort(
            (a, b) =>
                parseInt(getPokemonIdFromUrl(a.url)) -
                parseInt(getPokemonIdFromUrl(b.url))
        )

        return generationPokemon
    }
)
export const selectPokemonsByType = createSelector(
    selectPokemonData,
    (_: any, type: string) => type,
    (data: Pokemon[], type: string) => {
        return data.filter(pokemon => pokemon?.types?.some(t => t.type.name === type));
    }
);

export const selectPokemonsByAbility = createSelector(
    selectPokemonData,
    (_: any, ability: string) => ability,
    (data: Pokemon[], ability: string) => {
        return data.filter(pokemon => pokemon?.abilities?.some(a => a.ability.name === ability));
    }
);
