import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'

import {
    fetchPokemons,
    selectHasNext,
    selectCount,
    selectPokemonStatusLoading,
    selectFilteredPokemon,
} from 'features/pokemon'

import Modal from 'components/Modal'
import SearchResults from '../SearchResults'

import SearchIcon from 'assets/svg/SearchIcon'

import { debounce } from 'lodash'

import styles from './SearchPopup.module.scss'

type Props = {
    isOpen?: boolean
    setIsOpen?: (isOpen: boolean) => void
}

/**
 * Uses modal to display a popup allowing the user to query
 * and view all pokemon that match the query
 * because pokeapi does not have any fuzzy search - when this is
 * opened, we just fetch all pokemon and filter on the client side
 */
const SearchPopup = ({ isOpen = false, setIsOpen = () => {} }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [query, setQuery] = useState('')

    const dispatch = useAppDispatch()

    const count = useSelector(selectCount)
    const hasNext = useSelector(selectHasNext)
    const isLoading = useSelector(selectPokemonStatusLoading)

    const filteredPokemon = useSelector((state) =>
        selectFilteredPokemon(state, query)
    )

    // focus ref on mount
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [isOpen, inputRef])

    // lets make sure we only fetch all pokemon once
    // we achieve this by checking store for next value
    // limit is just set to the count, or 2000 if 0
    // offset is already saved in store from any other prev call
    useEffect(() => {
        if (hasNext && isOpen && !isLoading) {
            dispatch(
                fetchPokemons({
                    limit: count || 2000,
                })
            )
        }
    }, [count, hasNext, dispatch, isOpen, isLoading])

    const _handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleOnChange = debounce(_handleOnChange, 500)

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>
                <div className={styles.inputContainer}>
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a pokemon"
                        onChange={handleOnChange}
                    />
                </div>
                <SearchResults data={filteredPokemon} setIsOpen={setIsOpen} />
            </div>
        </Modal>
    )
}

export default React.memo(SearchPopup)
