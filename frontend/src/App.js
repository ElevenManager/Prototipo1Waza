import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Escritorio from './components/Escritorio';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import NoAccess from './components/NoAccess';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
                <Route path="/no-access" element={<DashboardLayout><NoAccess /></DashboardLayout>} />
                <Route
                    path="/"
                    element={<ProtectedRoute user={user} token={token}><DashboardLayout /></ProtectedRoute>}
                >
                    <Route index element={<RedirectUser user={user} />} />
                    <Route path="escritorio" element={<ProtectedRoute user={user} token={token} requiredPermission="escritorio"><Escritorio /></ProtectedRoute>} />
                    {/* Agrega aquí las otras rutas protegidas */}
                </Route>
            </Routes>
        </Router>
    );
};

const RedirectUser = ({ user }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.escritorio) {
        return <Navigate to="/escritorio" />;
    }

    return <Navigate to="/NoAccess" />;
};

export default App;
