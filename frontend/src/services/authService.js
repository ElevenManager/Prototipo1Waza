import axios from 'axios';

const API_URL = '/api';

const login = async (login, clave) => {
    const response = await axios.post(`${API_URL}/login`, { login, clave });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    login,
    logout,
};

export default authService;
