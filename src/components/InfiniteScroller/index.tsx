import React, { useCallback, useEffect } from 'react'

import Loading from 'components/Loading'

import styles from './InfiniteScroller.module.scss'

type Props = {
    className?: string
    children?: React.ReactNode
    fetchData?: () => void
    loading?: boolean
    limit?: number
}

/**
 * Обработка бесконечной прокрутки и выборки данных
 * когда пользователь прокручивает страницу вниз
 */
const InfiniteScroller = ({
    className = '',
    children = null,
    fetchData = () => {},
    loading = false,
}: Props) => {
    // - fetching for more data if the bottom is reached and there is more data to fetch
    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
            fetchData()
        }
    }, [fetchData])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <div className={className}>
            {children}
            {loading && <Loading className={styles.loading} />}
        </div>
    )
}

export default React.memo(InfiniteScroller)
