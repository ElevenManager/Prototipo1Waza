// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, token, requiredPermission }) => {
    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (requiredPermission && !user[requiredPermission]) {
        return <Navigate to="/no-access" />;
    }

    return children;
};

export default ProtectedRoute;
