import React from 'react'
import styles from './Error.module.css'
import { NavLink } from 'react-router-dom'
const Error = () => {
    return (
        <div className={styles.error}>
            <h1 className={styles.errorHeader}>Error 404-Page not Found </h1> <br />
            <p>Go Back To <NavLink to='/' className={styles.home}>Home</NavLink></p>
        </div>
    )
}

export default Error
