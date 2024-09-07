import React, { useState, useEffect } from 'react'
import {setUser} from '../store/UserSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useAutoLogin = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        (async function autoLoginApiCall() {
             try {
        const response = await axios.get(
          `${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };

          dispatch(setUser(user));
        }
      } catch (err) {
                //
			console.log('auto login error')

            } finally {
                setLoading(false)
console.log('auto login error')

            }

        })()
    }, [])

    return loading
    return (
        <div>

        </div>
    )
}

export default useAutoLogin
