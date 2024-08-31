import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, component: Component }) => {
    const accessToken = Cookies.get('access_token');
    const currentUser = useSelector((state) => state.user.currentUser);

    if (accessToken && currentUser) {
        if (path === '/sign-up' || path === '/sign-in') return <Navigate to='/' />
        else return <Component />
    }
    else {
        if (path === '/sign-up' || path === '/sign-in') return <Component />
        else return <Navigate to='/sign-in' />
    }
}

export default ProtectedRoute;