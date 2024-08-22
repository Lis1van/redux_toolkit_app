import React from 'react'

import searchIcon from 'assets/images/search.png'

import cx from 'classnames'
import styles from './SearchTrigger.module.scss'

type Props = {
    setIsOpen?: (isOpen: boolean) => void
    className?: string
}

/**
 * Renders a search icon which will render a search
 * input inside a popup when clicked
 */
const SearchTrigger = ({ setIsOpen = () => {}, className = '' }: Props) => (
    <div
        className={cx(className, styles.searchTrigger)}
        onClick={() => setIsOpen(true)}
    >
        <img src={searchIcon} alt="search" />
    </div>
)

export default React.memo(SearchTrigger)
