// noinspection JSValidateTypes

import React from 'react';
import './DashboardLayout.css';
import { Link, Outlet } from 'react-router-dom';
import logo from '../imagenes/logo.png';

const DashboardLayout = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // noinspection JSValidateTypes
    return (
        <div className="dashboard-layout">
            <nav className="dashboard-nav">
                <img src={logo} alt="Logo" className="logo" />
                <ul>
                    {user && user.escritorio && <li><Link to="/escritorio">Escritorio</Link></li>}
                    {user && user.pacientes && <li><Link to="/pacientes">Pacientes</Link></li>}
                    {user && user.clinica && (
                        <li>
                            <Link to="#">Clínica</Link>
                            <ul>
                                <li><Link to="/configuracion">Configuraciones</Link></li>
                                <li><Link to="/servicio">Servicios</Link></li>
                                <li><Link to="/personal">Personal</Link></li>
                                <li><Link to="/permiso">Permisos</Link></li>
                                <li><Link to="/diagnostico">Diagnóstico</Link></li>
                            </ul>
                        </li>
                    )}
                    {user && user.atencion && <li><Link to="/atencion">Atención</Link></li>}
                    {user && user.triaje && <li><Link to="/triaje">Triaje</Link></li>}
                    {user && user.resultado && <li><Link to="/plan">Plan de Atención</Link></li>}
                    {user && user.consultas && (
                        <li>
                            <Link to="#">Consultas</Link>
                            <ul>
                                <li><Link to="/pagos">Pagos</Link></li>
                                <li><Link to="/historias">Historias</Link></li>
                            </ul>
                        </li>
                    )}
                </ul>
                <button onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }}>Logout</button>
            </nav>
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
