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

// this selects pokemon from the main data array
// but if its not found based on the id existing (api fetched),
// then it will index into the selectedPokemon key
// finds pokemon by matching id which can be
// a number string or a pokemon's name
export const selectPokemonById = createSelector(
    selectPokemonData,
    selectSelectedPokemons,
    (_: any, id: string | null | undefined) => id,
    (data: Pokemon[], selectedPokemons: Pokemon[], id) => {
        if (!id) return null

        let foundPokemon: Pokemon | undefined | null

        const isMatch = (pokemon: Pokemon) =>
            // only if id is on the pokemon object, then we know it was fetched from the api
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

// used to filter pokemon by doing a simple case insensitive string includes check
// with first letter match
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

// based on the current filter string saved in store, we can fetch
// all the available pokemon data currently in store
// or return all the generational pokemon data coming from generations key
export const selectPokemonListData = createSelector(
    selectFilter,
    selectPokemonData,
    selectGenerationsData,
    (filter: string, pokemonData: Pokemon[], generationsData: Generations) => {
        if (filter === 'all') return pokemonData

        const generation: Generation = generationsData[filter]

        if (!generation) return []

        // sort pokemon by id
        const generationPokemon = [...generation.pokemon_species].sort(
            (a, b) =>
                parseInt(getPokemonIdFromUrl(a.url)) -
                parseInt(getPokemonIdFromUrl(b.url))
        )

        return generationPokemon
    }
)
