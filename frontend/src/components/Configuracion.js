import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import ConfiguracionForm from './ConfiguracionForm';

const Configuracion = () => {
    const [configuraciones, setConfiguraciones] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState(null);

    const fetchConfiguraciones = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/configuracion/listar', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setConfiguraciones(response.data.data || []); // Ensure we have an array
        } catch (error) {
            console.error('Error fetching data:', error);
            setConfiguraciones([]); // Set empty array on error
        }
    }, []);

    useEffect(() => {
        fetchConfiguraciones();
    }, [fetchConfiguraciones]);

    const handleEditClick = (config) => {
        setSelectedConfig(config);
        setIsFormOpen(true);
    };

    const handleSave = () => {
        setIsFormOpen(false);
        fetchConfiguraciones();
    };

    return (
        <div>
            <h1>Configuración</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Opciones</TableCell>
                            <TableCell>Razon Social</TableCell>
                            <TableCell>Ruc</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Responsable</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {configuraciones.map((config) => (
                            <TableRow key={config.idconfiguracion}>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEditClick(config)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{config.razon_social}</TableCell>
                                <TableCell>{config.ruc}</TableCell>
                                <TableCell>{config.email}</TableCell>
                                <TableCell>{config.telefono}</TableCell>
                                <TableCell>{config.direccion}</TableCell>
                                <TableCell>{config.responsable}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ConfiguracionForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                config={selectedConfig}
                onSave={handleSave}
            />
        </div>
    );
};

export default Configuracion;
