import React from 'react';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>Welcome, {user.nombre}</h1>
            <ul>
                {user.escritorio && <li><a href="/escritorio">Escritorio</a></li>}
                {user.pacientes && <li><a href="/pacientes">Pacientes</a></li>}
                {user.clinica && (
                    <li>
                        <a href="/clinica">Clínica</a>
                        <ul>
                            <li><a href="/configuracion">Configuraciones</a></li>
                            <li><a href="/servicio">Servicios</a></li>
                            <li><a href="/personal">Personal</a></li>
                            <li><a href="/permiso">Permisos</a></li>
                            <li><a href="/diagnostico">Diagnóstico</a></li>
                        </ul>
                    </li>
                )}
                {user.atencion && <li><a href="/atencion">Atención</a></li>}
                {user.triaje && <li><a href="/triaje">Triaje</a></li>}
                {user.resultado && <li><a href="/plan">Plan de Atención</a></li>}
                {user.consultas && (
                    <li>
                        <a href="/consultas">Consultas</a>
                        <ul>
                            <li><a href="/pagos">Pagos</a></li>
                            <li><a href="/historias">Historias</a></li>
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
