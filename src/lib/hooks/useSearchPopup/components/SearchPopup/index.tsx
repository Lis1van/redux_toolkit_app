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
 * Использует модальное окно для отображения всплывающего окна, позволяющего пользователю запрашивать
 * и просмотреть всех покемонов, соответствующих запросу
 * потому что у pokeapi нет никакого нечеткого поиска - когда это
 * открыто, мы просто получаем всех покемонов и фильтруем на стороне клиента
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

    // сфокусировать ссылку на монтировании
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [isOpen, inputRef])

    // давайте убедимся, что мы извлекаем всех покемонов только один раз
    // мы достигаем этого, проверяя хранилище на наличие следующего значения
    // лимит просто установлен на количество или 2000, если 0
    // смещение уже сохранено в памяти от любого другого предыдущего вызова
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
