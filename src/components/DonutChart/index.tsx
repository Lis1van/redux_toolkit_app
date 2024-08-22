import React from 'react'

import styles from './DonutChart.module.scss'

type Props = {
    percentage?: number
    color?: string
    centerText?: string
    label?: string
}

const DonutChart = ({
    percentage = 0,
    color = '#000',
    centerText = '',
    label = '',
}: Props) => (
    <div className={styles.container}>
        <div className={styles.donutChart}>
            <span className={styles.centerText}>{centerText}</span>
            <svg
                viewBox="0 0 40 40 "
                width="100"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    stroke="#efefef"
                    strokeWidth="5"
                    fill="none"
                    cx="20"
                    cy="20"
                    r="15.91549431"
                />
                <circle
                    className={styles.donutChart_circle}
                    stroke={color}
                    strokeWidth="5"
                    strokeDasharray={`${percentage},100`}
                    strokeLinecap="round"
                    fill="none"
                    cx="20"
                    cy="20"
                    r="15.91549431"
                />
            </svg>
        </div>
        <label>{label}</label>
    </div>
)

export default React.memo(DonutChart)
