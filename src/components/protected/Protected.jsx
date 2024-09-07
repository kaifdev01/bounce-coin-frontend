import React from 'react'
import { Navigate } from 'react-router'

const Protected = ({ isAuth, children }) => {
    if (isAuth) {
        return children
    } else {
        return <Navigate to='/log-in' />
    }

    return (
        <div>

        </div>
    )
}

export default Protected
