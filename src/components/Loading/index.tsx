import React from 'react'

import pokeball from 'assets/images/pokeball.png'

import cx from 'classnames'

import styles from './Loading.module.scss'

const Loading = ({ size = 64, className = '' }) => {
    return (
        <div className={cx(className, styles.loading)}>
            <img
                src={pokeball}
                alt="pokeball"
                style={{
                    width: size,
                    height: size,
                }}
            />
        </div>
    )
}

export default React.memo(Loading)
