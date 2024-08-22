import React, { useState } from 'react'

import Types from '../Types'

import { getSpriteImageUrl } from 'lib/utils/image'

import shiny from 'assets/images/shiny.png'
import pokeball from 'assets/images/pokeball.png'

import cx from 'classnames'
import styles from './Banner.module.scss'

type Props = {
    name?: string
    id: number | undefined
    color?: string
}

/**
 * Main banner image for a pokemon along with its name, id, and types
 */
const Banner = ({ name = '', id, color = '#fff' }: Props) => {
    const [showShiny, setShowShiny] = useState(false)

    const spriteUrl = getSpriteImageUrl(id)
    const shinySpriteUrl = getSpriteImageUrl(id, {
        shiny: true,
    })

    const imageUrl = showShiny ? shinySpriteUrl : spriteUrl

    // get random number for animation
    const randomNumber = Math.floor(Math.random() * 2) + 1

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: `linear-gradient(${color}, #fff)`,
            }}
        >
            <img
                src={imageUrl}
                alt={name}
                className={cx(
                    styles.sprite,
                    styles[`sprite--animation-${randomNumber}`]
                )}
            />
            <img
                onClick={() => setShowShiny(!showShiny)}
                src={shiny}
                alt="shiny"
                className={styles.shiny}
            />
            <div className={styles.container_meta}>
                <div>
                    <img src={pokeball} alt="pokeball" />
                    <h3>#{id}</h3>
                </div>
                <h1>{name}</h1>
                <Types />
            </div>
        </div>
    )
}

export default React.memo(Banner)
