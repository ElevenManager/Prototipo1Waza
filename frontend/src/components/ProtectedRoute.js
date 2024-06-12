import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredPermission }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (requiredPermission && !user[requiredPermission]) {
        return <Navigate to="/no-access" />;
    }

    return children;
};

export default ProtectedRoute;
