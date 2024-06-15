// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Escritorio from './components/Escritorio';
import ProtectedRoute from './components/ProtectedRoute';
import Pacientes from './components/Pacientes';
import Configuracion from './components/Configuracion';
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
                    <Route path="pacientes" element={<ProtectedRoute user={user} token={token} requiredPermission="pacientes"><Pacientes /></ProtectedRoute>} />
                    <Route path="configuracion" element={<ProtectedRoute user={user} token={token} requiredPermission="clinica"><Configuracion /></ProtectedRoute>} />

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
    if (user.pacientes) {
        return <Navigate to="/pacientes" />;
    }
    if (user.clinica) {
        return <Navigate to="/configuracion" />;
    }

    return <Navigate to="/no-access" />;
};

export default App;
