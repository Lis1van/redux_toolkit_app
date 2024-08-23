import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'

import InfiniteScroller from 'components/InfiniteScroller'

import { DEFAULT_LIMIT } from 'lib/constants/api'

import { debounce } from 'lodash'

type Props = {
    fetchAction: (props: any) => any
    dataSelector: (state: any) => any
    loadingSelector: (state: any) => boolean
    hasNextSelector: (state: any) => boolean
    offsetSelector: (state: any) => number
    limit?: number
    shouldFetch?: boolean
}
/**
 *
 * @param fetchAction создатель действия для получения данных
 * Селектор @param dataSelector для получения данных из хранилища Redux
 * Селектор @param loadingSelector для получения статуса загрузки из хранилища Redux
 * Селектор @param hasNextSelector для получения статуса hasNext из хранилища redux
 * @returns
 * InfiniteScroller {Component} для рендеринга в родительском компоненте
 * данные {any[]} дочерние элементы вышеуказанного <InfiniteScroller> отображаются,
 * однако родительский компонент определяет
 */
const useInfiniteScroller = ({
    fetchAction = (props) => props,
    dataSelector = (data = []) => data,
    loadingSelector = (loading = false) => loading,
    hasNextSelector = (hasNext = false) => hasNext,
    offsetSelector = (offset = 0) => offset,
    limit = DEFAULT_LIMIT,
    shouldFetch = true,
}: Props) => {
    const dispatch = useAppDispatch()

    const data = useSelector(dataSelector)
    const isLoading = useSelector(loadingSelector)
    const hasNext = useSelector(hasNextSelector)
    const currOffset = useSelector(offsetSelector)

    const _fetchData = useCallback(() => {
        if (isLoading || !hasNext || !shouldFetch) return
        dispatch(fetchAction({ offset: currOffset, limit }))
    }, [
        currOffset,
        limit,
        dispatch,
        fetchAction,
        isLoading,
        hasNext,
        shouldFetch,
    ])

    const fetchData = debounce(_fetchData, 200)

    // при монтировании мы проверяем, что смонтировано достаточно данных для отображения полосы прокрутки
    // чтобы пользователь мог прокрутить вниз и вызвать бесконечный скроллер
    useEffect(() => {
        const canScroll = document.body.scrollHeight > window.innerHeight
        if (!canScroll && hasNext && shouldFetch) {
            fetchData()
        }
    }, [hasNext, fetchData, shouldFetch])

    return {
        InfiniteScroller: ({
            children,
            className,
        }: {
            children: React.ReactNode
            className: string
        }) => (
            <InfiniteScroller
                className={className}
                fetchData={fetchData}
                children={children}
                loading={isLoading}
                limit={limit}
            />
        ),
        data,
    }
}

export default useInfiniteScroller
