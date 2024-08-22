import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getPokemonIdFromUrl, unslug } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import EvolutionDetails from './EvolutionDetails'

import ArrowSvg from 'assets/svg/Arrow'

import styles from './Evolutions.module.scss'

type Props = {
    id: string | undefined
    details?: EvolutionDetail[]
    chain: Evolution // acts as the children of the current evolution
    name?: string
}

/**
 * Recursive component to render evolution chain
 */
const Evolution = ({ id, details = [], chain, name = '' }: Props) => {
    const { id: currentId } = useParams()

    const navigate = useNavigate()

    const { evolves_to: evolvesTo = [] } = chain

    const imageUrl = getSpriteImageUrl(id)

    return (
        <div className={styles.evolution}>
            <div
                className={styles.evolution_meta}
                onClick={() => currentId !== id && navigate(`/pokemon/${id}`)}
            >
                <img src={imageUrl} alt={name} />
                <span className={styles.evolution_meta_name}>{name}</span>
                <EvolutionDetails details={details} />
            </div>
            {!!evolvesTo.length && (
                <div className={styles.evolution_children}>
                    <span className={styles.evolution_to}>
                        <ArrowSvg />
                    </span>
                    {evolvesTo.map(
                        (evolution: Evolution) =>
                            evolution && (
                                <Evolution
                                    key={evolution?.species?.name}
                                    details={evolution?.evolution_details || []}
                                    chain={evolution}
                                    name={unslug(evolution?.species?.name)}
                                    id={getPokemonIdFromUrl(
                                        evolution?.species?.url || ''
                                    )}
                                />
                            )
                    )}
                </div>
            )}
        </div>
    )
}

export default React.memo(Evolution)
