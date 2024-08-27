import React from 'react'

import { unslug } from 'lib/utils/strings'
import { get } from 'lodash'

import styles from './Evolutions.module.scss'

type Props = {
    details?: EvolutionDetail[]
}

const TRIGGER_MAP: {
    [key: string]: { key: string; text: string }[]
} = {
    'level-up': [
        {
            key: 'min_level',
            text: 'At Lv. ',
        },
        {
            key: 'location.name',
            text: 'At ',
        },
        {
            key: 'known_move_type.name',
            text: 'Level with move of type: ',
        },
    ],
    'use-item': [
        {
            key: 'item.name',
            text: 'Use ',
        },
    ],
}

const EvolutionDetails = ({ details = [] }: Props) => {
    return (
        <div className={styles.evolution_meta_detail}>
            {details.map((detail) => {
                const { trigger } = detail

                const triggerName = trigger?.name


                const triggerKeysToCheck = TRIGGER_MAP[triggerName] || []


                const { value: triggerKeyValue, text } =
                    triggerKeysToCheck.reduce(
                        (foundValue: any, { key, text }) =>
                            foundValue?.value
                                ? foundValue
                                : {
                                      value: get(detail, key),
                                      text,
                                  },
                        {}
                    )

                if (!triggerKeyValue) {
                    return null
                }

                return (
                    <div
                        key={trigger.name}
                        className={styles.evolution_meta_trigger}
                    >
                        {text}
                        {unslug(triggerKeyValue)}
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(EvolutionDetails)
