import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.nombre} {user.apaterno} {user.amaterno}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
