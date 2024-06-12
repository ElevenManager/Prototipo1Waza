import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../imagenes/logo.png';
import background from '../imagenes/background.jpg';


    const Login = ({ setToken, setUser }) => {
        const [login, setLogin] = useState('');
        const [clave, setClave] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                const response = await axios.post('http://localhost:3002/api/login', { login, clave });
                const { token, user } = response.data;
                setToken(token);
                setUser(user);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate(user.escritorio ? '/escritorio' : '/no-access');
            } catch (error) {
                setError('Login failed. Please check your credentials and try again.');
                console.error('Error logging in:', error);
                console.error('Error response:', error.response);
            }
        };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-form">
                <img src={logo} alt="Logo" className="logo" />
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Login</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Clave</label>
                        <input
                            type="password"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
