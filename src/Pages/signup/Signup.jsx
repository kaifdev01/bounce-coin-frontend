import React, { useState } from 'react'
import styles from './Signup.module.css'
import TextInput from '../../components/TextInput/TextInput'
import { useFormik } from 'formik'
import signupSchema from '../../schemas/signupSchema'
import { setUser } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../api/internal'
// import { ToastContainer, toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toast'
// import toast, { Toaster } from 'react-hot-toast';

// import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSignup = async () => {
        const data = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }

        const response = await signup(data)

        if (response.status === 201) {
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                auth: response.data.auth,
            };
            dispatch(setUser(user));

            toast.success('Account created', {
                position: 'top-right', // Set the position of the toast
                autoClose: 3000,       // Close the toast after 3 seconds (optional)
            });
            // 2. redirect -> homepage
            navigate("/");
        } else if (response.code === "ERR_BAD_REQUEST") {
            // display error message
            setError(response.response.data.message);
            console.log('error')
            toast.error(response.response.data.message, {
                position: 'bottom-right', // Set the position of the toast
                autoClose: 3000,       // Close the toast after 3 seconds (optional)
            });
        }

    };

    const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
            name: '',
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },

        validationSchema: signupSchema,
    });
    return (

        <div className={styles.signupWrapper}>
            <div className={styles.signupHeader}>Create New Account</div>
            <TextInput
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name"
                error={errors.name && touched.name ? 1 : undefined}
                errormessage={errors.name}
            />
            <TextInput
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="username"
                error={errors.username && touched.username ? 1 : undefined}
                errormessage={errors.username}
            />
            <TextInput
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="email"
                error={errors.email && touched.email ? 1 : undefined}
                errormessage={errors.email}
            />
            <TextInput
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="password"
                error={errors.password && touched.password ? 1 : undefined}
                errormessage={errors.password}
            />
            <TextInput
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm Password" error={
                    errors.confirmPassword && touched.confirmPassword ? 1 : undefined
                }
                errormessage={errors.confirmPassword}
            />
            <button
                className={styles.signupButton}
                onClick={handleSignup}
                disabled={
                    !values.username ||
                    !values.password ||
                    !values.name ||
                    !values.confirmPassword ||
                    !values.email ||
                    errors.username ||
                    errors.password ||
                    errors.confirmPassword ||
                    errors.name ||
                    errors.email
                }
            >Sign up</button>
            {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
            <span>Already Have an Account? <button className={styles.login} onClick={() => navigate('/log-in')}>Login</button></span>

            <ToastContainer />
        </div>

    )
}

export default Signup