import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ServicioForm = ({ open, onClose, servicio, onSave }) => {
    const [formData, setFormData] = useState({
        idservicio: '',
        nombre: '',
        costo: '',
        categoria: ''
    });

    useEffect(() => {
        if (servicio) {
            setFormData(servicio);
        } else {
            setFormData({
                idservicio: '',
                nombre: '',
                costo: '',
                categoria: ''
            });
        }
    }, [servicio]);

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
            await axios.post('http://localhost:3002/api/servicio/guardaryeditar', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            onSave();
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Servicio</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Costo"
                        name="costo"
                        value={formData.costo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Categoria"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">Cancelar</Button>
                        <Button type="submit" color="primary">Guardar</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ServicioForm;
