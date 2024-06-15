// src/components/ConfiguracionForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const ConfiguracionForm = ({ open, onClose, config, onSave }) => {
    const [formData, setFormData] = useState({
        idconfiguracion: '',
        razon_social: '',
        ruc: '',
        email: '',
        telefono: '',
        direccion: '',
        responsable: ''
    });

    useEffect(() => {
        if (config) {
            setFormData(config);
        } else {
            setFormData({
                idconfiguracion: '',
                razon_social: '',
                ruc: '',
                email: '',
                telefono: '',
                direccion: '',
                responsable: ''
            });
        }
    }, [config]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/api/configuracion/guardaryeditar', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            onSave(response.data);
        } catch (error) {
            console.error('Error saving configuration:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{formData.idconfiguracion ? 'Editar Configuración' : 'Agregar Configuración'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Razon Social"
                                name="razon_social"
                                value={formData.razon_social}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Ruc"
                                name="ruc"
                                value={formData.ruc}
                                onChange={handleChange}
                                fullWidth
                                required
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Responsable"
                                name="responsable"
                                value={formData.responsable}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">Cancelar</Button>
                        <Button type="submit" color="primary">Guardar</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ConfiguracionForm;
