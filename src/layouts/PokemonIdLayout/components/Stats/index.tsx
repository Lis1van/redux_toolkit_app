import React from 'react'

import DonutChart from 'components/DonutChart'

import { unslug } from 'lib/utils/strings'
import { STAT_COLORS } from 'lib/constants/pokemonTypes'

import styles from './Stats.module.scss'

type Props = {
    data: Stat[]
}

const MAX_STAT_VALUE = 255

/**
 * Renders a donut chart for each stat
 */
const PokemonIdStats = ({ data = [] }: Props) => (
    <div className={styles.container}>
        <h2>Base Stats</h2>
        <div className={styles.grid_container}>
            {data.map(({ base_stat = 0, stat = {} }) => {
                const percentage = (base_stat / MAX_STAT_VALUE) * 100
                const statName = stat.name || ''
                const statColor = STAT_COLORS[statName]
                return (
                    <DonutChart
                        key={statName}
                        percentage={percentage}
                        label={unslug(statName)}
                        centerText={`${base_stat}/${MAX_STAT_VALUE}`}
                        color={statColor}
                    />
                )
            })}
        </div>
    </div>
)

export default React.memo(PokemonIdStats)
