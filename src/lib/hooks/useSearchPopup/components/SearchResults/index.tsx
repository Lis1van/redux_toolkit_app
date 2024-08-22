import React from 'react'
import { Link } from 'react-router-dom'

import { unslug, getPokemonIdFromUrl } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import snorlax from 'assets/images/snorlax.gif'

import styles from './SearchResults.module.scss'

type Props = {
    data: Pokemon[]
    setIsOpen?: (isOpen: boolean) => void
}

/**
 * Renders a list of pokemon with sprites and names
 * Clicking a pokemon will redirect to that pokemon's page
 */
const SearchResults = ({ data = [], setIsOpen = () => {} }: Props) => (
    <div className={styles.container}>
        {!!data.length ? (
            data.map(
                ({
                    id: _id,
                    name,
                    url,
                }: {
                    id: number
                    name: string
                    url: string
                }) => {
                    const id = _id || getPokemonIdFromUrl(url)
                    const spriteUrl = getSpriteImageUrl(id)
                    if (!id) return null
                    return (
                        <Link
                            to={`/pokemon/${id}`}
                            key={id}
                            className={styles.container_item}
                            onClick={() => setIsOpen(false)}
                        >
                            <img src={spriteUrl} alt={name} />
                            <span>{unslug(name)}</span>
                        </Link>
                    )
                }
            )
        ) : (
            <div className={styles.empty}>
                <img src={snorlax} alt="Snorlax" />
                <span>Snorlax waits...</span>
            </div>
        )}
    </div>
)

export default React.memo(SearchResults)
