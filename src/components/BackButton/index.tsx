import React from 'react'
import { useNavigate } from 'react-router-dom'

import pikachuPointer from 'assets/images/pikachu-point.png'
import ArrowSvg from 'assets/svg/Arrow'

import styles from './BackButton.module.scss'

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.back} onClick={() => navigate('/')}>
            <ArrowSvg />
            <img src={pikachuPointer} alt="back" />
        </div>
    )
}

export default React.memo(BackButton)
