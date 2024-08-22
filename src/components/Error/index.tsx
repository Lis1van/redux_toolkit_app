import React from 'react'

import { Link } from 'react-router-dom'

import sadPikachuImage from 'assets/images/sad-pikachu.png'

import styles from './Error.module.scss'

/**
 * Компонент ошибки, отображающий ссылку на домашнюю страницу.
 */
const Error = () => (
    <div className={styles.error}>
        <p>An error occured</p>
        <img src={sadPikachuImage} alt="sad pikachu" />
        <Link to="/">Go to home page</Link>
    </div>
)

export default React.memo(Error)
