import React,{useState,useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from './auth'
import {GetEmployeeById} from './employee'

const PrivateRoutes = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={props => 
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state:{from : props.location}
                    }}
                    />
            )
        }
        />
    )
}

export default PrivateRoutes
