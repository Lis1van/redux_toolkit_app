import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'
import { useParams, Outlet } from 'react-router-dom'

import {
    fetchPokemon,
    fetchPokemons,
    selectPokemonData,
    selectPokemonById,
    selectPokemonStatusLoading,
} from 'features/pokemon'

import Navbar from 'components/Navbar'
import Loading from 'components/Loading'
import BackButton from 'components/BackButton'
import CarouselNav from 'components/CarouselNav'

import Stats from './components/Stats'
import Banner from './components/Banner'
import Evolutions from './components/Evolutions'

import useSearchPopup from 'lib/hooks/useSearchPopup'

import { unslug } from 'lib/utils/strings'
import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import styles from './PokemonIdLayout.module.scss'

const PokemonIdLayout = () => {
    const dispatch = useAppDispatch()

    const { id: pokemonId } = useParams()

    const { SearchPopup, SearchTrigger } = useSearchPopup()

    const isLoading = useSelector(selectPokemonStatusLoading)

    const pokemonData: Pokemon[] = useSelector(selectPokemonData)
    const currPokemonData = useSelector((state) =>
        selectPokemonById(state, pokemonId)
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!currPokemonData) {
            dispatch(fetchPokemon(pokemonId))
        }
    }, [currPokemonData, pokemonId, dispatch])

    // lets fetch some data from list endpoint
    // to get some pagination data (count) thats needed for top nav
    // to get prev/next pokemon
    useEffect(() => {
        if (!pokemonData.length) {
            dispatch(
                fetchPokemons({
                    limit: 1,
                })
            )
        }
    }, [pokemonData, dispatch])

    const { name: _name, id, types = [], stats = [] } = currPokemonData || {}

    if (!pokemonId) {
        throw new Error('Pokemon ID is missing')
    }

    const name = unslug(_name)

    const typeName: string | undefined = types[0]?.type?.name
    const color: string = typeName ? TYPE_COLORS[typeName] || '' : ''

    return (
        <div className={styles.layout}>
            <SearchPopup />
            <Navbar color={color}>
                <BackButton />
                <CarouselNav />
                <SearchTrigger />
            </Navbar>
            {isLoading && !currPokemonData ? (
                <Loading size={100} className={styles.loading} />
            ) : (
                <>
                    <Banner name={name} id={id} color={color} />
                    <div className={styles.content}>
                        <Stats data={stats} />
                        <Evolutions id={id} />
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    )
}

export default React.memo(PokemonIdLayout)
