import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectPokemonById } from 'features/pokemon'

import { unslug } from 'lib/utils/strings'
import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import styles from './Types.module.scss'

const PokemonTypes = () => {
    const { id: pokemonId } = useParams()

    const pokemonData: Pokemon = useSelector((state) =>
        selectPokemonById(state, pokemonId)
    )

    const { types = [] } = pokemonData || {}

    return (
        <div className={styles.container}>
            {types.map(({ type }) => {
                let typeImgSrc

                try {
                    typeImgSrc = require(`assets/images/types/${type.name}.png`)
                } catch (e) {
                    console.log(e)
                }

                return (
                    <div
                        key={type.name}
                        style={{
                            backgroundColor: TYPE_COLORS[type.name],
                        }}
                    >
                        {typeImgSrc && <img src={typeImgSrc} alt={type.name} />}
                        {unslug(type.name)}
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(PokemonTypes)
