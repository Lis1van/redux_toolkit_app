import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
    fetchPokemons,
    selectPokemonStatusLoading,
    selectPokemonListData,
    selectHasNext,
    selectOffset,
    selectFilter,
} from 'features/pokemon'

import { unslug, getPokemonIdFromUrl } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import useInfiniteScroller from 'lib/hooks/useInfiniteScroller'

import styles from './PokemonList.module.scss'

const PokemonList = () => {
    const navigate = useNavigate()

    // prevent fetching data if were using a generation filter
    const filter = useSelector(selectFilter)

    const shouldFetch = filter === 'all'

    const { InfiniteScroller, data } = useInfiniteScroller({
        shouldFetch,
        fetchAction: fetchPokemons,
        dataSelector: selectPokemonListData,
        loadingSelector: selectPokemonStatusLoading,
        hasNextSelector: selectHasNext,
        offsetSelector: selectOffset,
    })

    return (
        <InfiniteScroller className={styles.pokemonList}>
            {data &&
                data.map((pokemon: Pokemon) => {
                    const id = pokemon?.id || getPokemonIdFromUrl(pokemon?.url)
                    const baseSpriteUrl = getSpriteImageUrl(id)
                    const shinySpriteUrl = getSpriteImageUrl(id, {
                        shiny: true,
                    })
                    return (
                        <div
                            key={pokemon?.name}
                            className={styles.pokemonList_item}
                            onClick={() => navigate(`/pokemon/${id}`)}
                        >
                            <img
                                src={baseSpriteUrl}
                                onMouseOver={(e) => {
                                    e.currentTarget.src = shinySpriteUrl
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.src = baseSpriteUrl
                                }}
                                alt={pokemon?.name}
                            />
                            <span className={styles.pokemonList_item_number}>
                                #{id}
                            </span>
                            <span className={styles.pokemonList_item_name}>
                                {unslug(pokemon?.name)}
                            </span>
                        </div>
                    )
                })}
        </InfiniteScroller>
    )
}

export default React.memo(PokemonList)
