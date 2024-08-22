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
 * @param fetchAction action creator to fetch data
 * @param dataSelector selector to get data from redux store
 * @param loadingSelector selector to get loading status from redux store
 * @param hasNextSelector selector to get hasNext status from redux store
 * @returns
 *    InfiniteScroller {Component} to render in parent component
 *    data {any[]} children of the above <InfiniteScroller> rendered however the parent component defines
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

    // on mount, we make sure there is enough data mounted to render a scrollbar
    // so that a user can scroll down to trigger the infinite scroller
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
