import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>Welcome, {user ? user.nombre : 'Guest'}</h1>
            <ul>
                {user && user.escritorio && <li><Link to="/escritorio">Escritorio</Link></li>}
                {user && user.pacientes && <li><Link to="/pacientes">Pacientes</Link></li>}
                {user && user.clinica && (
                    <li>
                        <Link to="/clinica">Clínica</Link>
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
                        <Link to="/consultas">Consultas</Link>
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
        </div>
    );
};

export default Dashboard;
