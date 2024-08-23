import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { useAppDispatch } from 'store'

import {
    fetchGenerations,
    fetchGeneration,
    selectGenerationsData,
    selectGenerationsCount,
} from 'features/generations'
import { selectFilter, setFilter } from 'features/pokemon'

import styles from './FilterDropdown.module.scss'

type Option = {
    label: string
    value: string | number
}

/**
 * Управляет фильтрацией и отображением списка покемонов.
 * По данным поколений
 * Также обрабатывает выборку данных о поколениях.
 */
const FilterDropdown = () => {
    const dispatch = useAppDispatch()

    const currentFilter = useSelector(selectFilter)
    const generations: Generations = useSelector(selectGenerationsData)
    const generationsCount = useSelector(selectGenerationsCount)

    const allValue = { label: 'All', value: 'all' }

    const options = [
        allValue,
        ...Object.keys(generations).map(
            (_, idx) => ({
                label: `Gen. ${idx + 1}`,
                value: idx + 1,
            }),
            []
        ),
    ]

    const defaultValue =
        options.find((option) => option.value === currentFilter) || allValue

    const [selectedOption, setSelectedOption] = useState<Option>(defaultValue)

    // fetch generational data to use for dropdown
    useEffect(() => {
        if (!generationsCount) {
            dispatch(fetchGenerations())
        }
    }, [dispatch, generationsCount])

    // обновляем фильтр в магазине при изменении раскрывающегося списка
    // а также извлекаем данные генерации, если они не существуют
    // логика кэширования этих запросов обрабатывается в переходнике
    useEffect(() => {
        if (selectedOption) {
            dispatch(setFilter(selectedOption.value))
            if (selectedOption.value !== 'all') {
                dispatch(fetchGeneration(selectedOption.value))
            }
        }
    }, [selectedOption, dispatch])

    const isMobile = window.innerWidth < 768

    return (
        <div className={styles.container}>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                menuPlacement={isMobile ? 'top' : 'bottom'}
                className={styles.select}
                isSearchable={false}
            />
        </div>
    )
}

export default React.memo(FilterDropdown)
