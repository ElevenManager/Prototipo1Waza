import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Escritorio.css';

const Escritorio = () => {
    const [triajeList, setTriajeList] = useState([]);
    const [planList, setPlanList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.escritorio) {
            navigate('/no-access');
            return;
        }

        const fetchTriaje = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3002/api/escritorio/listarTriaje', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setTriajeList(result);
            } catch (error) {
                console.error('Error fetching Triaje:', error);
            }
        };

        const fetchPlan = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3002/api/escritorio/listarPlan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setPlanList(result);
            } catch (error) {
                console.error('Error fetching Plan:', error);
            }
        };

        fetchTriaje();
        fetchPlan();
    }, [navigate]);

    return (
        <div className="escritorio-container">
            <div className="card">
                <h2>Triaje</h2>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Paciente</th>
                    </tr>
                    </thead>
                    <tbody>
                    {triajeList.length > 0 ? (
                        triajeList.map((item, index) => (
                            <tr key={index}>
                                <td><span className="label bg-green">{index + 1}</span></td>
                                <td>{item.paciente}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No data available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="card">
                <h2>Atención</h2>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Paciente</th>
                    </tr>
                    </thead>
                    <tbody>
                    {planList.length > 0 ? (
                        planList.map((item, index) => (
                            <tr key={index}>
                                <td><span className="label bg-red">{index + 1}</span></td>
                                <td>{item.paciente}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No data available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Escritorio;
