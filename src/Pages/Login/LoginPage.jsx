import React, { useState } from 'react'
import styles from './Login.module.css'
import { login } from '../../api/internal'
import TextInput from '../../components/TextInput/TextInput'
import LoginSchema from '../../schemas/LoginSchema'
import { useFormik } from 'formik'
import { setUser } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import toast, { Toaster } from 'react-hot-toast';

// import { ToastContainer, toast } from 'react-toast'

const LoginPage = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await login(data);

    if (response.success) {

    }
    if (response.status === 200) {

      // 1. setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      // 2. Show success toast
      toast.success('Login Successful!')
      // 3. redirect -> homepage
      navigate("/");


    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
      console.log('error')
      toast.error(response.response.data.message, {
        position: 'top-right',
        autoClose: 3000, // Milliseconds until the toast automatically closes
        hideProgressBar: false, // Display a progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause closing when hovered
        draggable: true,
        theme: "dark", // Allow dragging to dismiss
      })

    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
  });



  return (
    <div className={styles.wrapper}>
      <div >
        <p className={styles.header}>Login to your account</p>
      </div>
      <TextInput
        type='email'
        value={values.email}
        name='email'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='Email'
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}

      />
      <TextInput
        type='password'
        value={values.password}
        name='password'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='password'
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <button
        className={styles.loginButton}
        onClick={handleLogin}
        disabled={
          !values.email ||
          !values.password ||
          errors.email ||
          errors.password
        }
      >Login</button>

      <span>Don't have an account? <button className={styles.createAccount} onClick={() => navigate('/sign-up')}>Register</button></span>
      {error != " " ? <p className={styles.errorMessage}>{error}</p> : ' '}
      <ToastContainer />

    </div>
  )
}

export default LoginPage
