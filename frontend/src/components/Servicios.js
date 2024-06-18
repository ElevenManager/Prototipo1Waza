import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import ServicioForm from './ServicioForm';

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedServicio, setSelectedServicio] = useState(null);

    const fetchServicios = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/servicio/listar', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setServicios(response.data || []); // Ensure we have an array
        } catch (error) {
            console.error('Error fetching data:', error);
            setServicios([]); // Set empty array on error
        }
    }, []);

    useEffect(() => {
        fetchServicios();
    }, [fetchServicios]);

    const handleAddClick = () => {
        setSelectedServicio(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (servicio) => {
        setSelectedServicio(servicio);
        setIsFormOpen(true);
    };

    const handleDeactivateClick = async (idservicio) => {
        try {
            await axios.post('http://localhost:3002/api/servicio/desactivar', { idservicio }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchServicios();
        } catch (error) {
            console.error('Error deactivating servicio:', error);
        }
    };

    const handleActivateClick = async (idservicio) => {
        try {
            await axios.post('http://localhost:3002/api/servicio/activar', { idservicio }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchServicios();
        } catch (error) {
            console.error('Error activating servicio:', error);
        }
    };

    const handleSave = () => {
        setIsFormOpen(false);
        fetchServicios();
    };

    return (
        <div>
            <h1>Servicios</h1>
            <Button variant="contained" color="primary" onClick={handleAddClick}>
                <AddIcon /> Agregar
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Opciones</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Costo</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Categoria</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servicios.map((servicio) => (
                            <TableRow key={servicio.idservicio}>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEditClick(servicio)}>
                                        <EditIcon />
                                    </IconButton>
                                    {servicio.condicion ? (
                                        <IconButton aria-label="desactivar" onClick={() => handleDeactivateClick(servicio.idservicio)}>
                                            <CloseIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton aria-label="activar" onClick={() => handleActivateClick(servicio.idservicio)}>
                                            <CheckIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell>{servicio.nombre}</TableCell>
                                <TableCell>{servicio.costo}</TableCell>
                                <TableCell>
                                    {servicio.condicion ? 'Activado' : 'Desactivado'}
                                </TableCell>
                                <TableCell>{servicio.categoria}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ServicioForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                servicio={selectedServicio}
                onSave={handleSave}
            />
        </div>
    );
};

export default Servicios;
