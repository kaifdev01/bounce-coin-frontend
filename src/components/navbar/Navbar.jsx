import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useSelector } from 'react-redux';
import { signout } from '../../api/internal'
import { resetUser } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.user.auth);
    const dispatch = useDispatch();
    const handleSignout = async () => {
        await signout();
        dispatch(resetUser());
    };
    return (
        <div>
            <nav className={styles.Navbar}>
                <NavLink
                    to='/'
                    className={`${styles.logo} ${styles.inactivestyles}`}>Coin Bounce</NavLink>
                <NavLink
                    to='/'
                    className={({ isActive }) => isActive ? styles.activestyles : styles.inactivestyles}
                >Home</NavLink>
                <NavLink
                    to='crypto'
                    className={({ isActive }) => isActive ? styles.activestyles : styles.inactivestyles}

                >Crypto-Currencies</NavLink>
                <NavLink
                    to='blog'
                    className={({ isActive }) => isActive ? styles.activestyles : styles.inactivestyles}

                >Blogs</NavLink>
                <NavLink
                    to='submit-blog'
                    className={({ isActive }) => isActive ? styles.activestyles : styles.inactivestyles}

                >Submit a Blog</NavLink>
                {isAuthenticated ? <div>
                    <NavLink ><button className={styles.signoutButton} onClick={handleSignout}>Sign Out</button></NavLink> </div> :
                    <div>
                        <NavLink
                            to='log-in'
                            className={({ isActive }) => isActive ? styles.activestyles : styles.inactivestyles}

                        >
                            <button className={styles.loginButton}>Log-In</button>
                        </NavLink>
                        <NavLink
                            to='sign-up'
                            className={({ isActive }) => isActive ? styles.activestyles : styles.inactivestyles}

                        >
                            <button className={styles.signupButton} >Sign up</button>
                        </NavLink>
                    </div>
                }
            </nav>
            <div className={styles.seprator}></div>
        </div>
    )
}

export default Navbar
