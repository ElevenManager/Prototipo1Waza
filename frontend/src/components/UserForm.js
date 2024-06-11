import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        apaterno: '',
        amaterno: '',
        nombre: '',
        fecha_nacimiento: '',
        sexo: '',
        estado_civil: '',
        tipo_documento: '',
        num_documento: '',
        direccion: '',
        telefono: '',
        email: '',
        ocupacion: '',
        cargo: '',
        especialidad: '',
        login: '',
        clave: '',
        permisos: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', formData);
            console.log('Usuario creado:', response.data);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="apaterno" value={formData.apaterno} onChange={handleChange} placeholder="Apellido Paterno" />
            <input type="text" name="amaterno" value={formData.amaterno} onChange={handleChange} placeholder="Apellido Materno" />
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
            <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} placeholder="Fecha de Nacimiento" />
            <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} placeholder="Sexo" />
            <input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange} placeholder="Estado Civil" />
            <input type="text" name="tipo_documento" value={formData.tipo_documento} onChange={handleChange} placeholder="Tipo de Documento" />
            <input type="text" name="num_documento" value={formData.num_documento} onChange={handleChange} placeholder="Número de Documento" />
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="ocupacion" value={formData.ocupacion} onChange={handleChange} placeholder="Ocupación" />
            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo" />
            <input type="text" name="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Especialidad" />
            <input type="text" name="login" value={formData.login} onChange={handleChange} placeholder="Login" />
            <input type="password" name="clave" value={formData.clave} onChange={handleChange} placeholder="Clave" />
            <button type="submit">Crear Usuario</button>
        </form>
    );
};

export default UserForm;
