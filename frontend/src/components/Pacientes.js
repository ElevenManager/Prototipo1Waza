import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, IconButton, Container
} from '@mui/material';
import {
    Add as AddIcon, Edit as EditIcon, FileCopy as FileCopyIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import PacienteForm from './PacienteForm';
import PacienteHistory from './PacienteHistory';
import axios from 'axios';

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [historia, setHistoria] = useState([]);

    const fetchPacientes = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3002/api/persona/listar?texto=${searchText}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPacientes(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [searchText]);

    useEffect(() => {
        fetchPacientes();
    }, [fetchPacientes]);

    const handleAddClick = () => {
        setSelectedPaciente(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (id) => {
        const paciente = pacientes.find(p => p.idpersona === id);
        setSelectedPaciente(paciente);
        setIsFormOpen(true);
    };

    const handleHistoryClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/api/atencion/ListarAtenciones/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHistoria(response.data);
            setIsHistoryOpen(true);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleSave = async (data) => {
        try {
            if (data.idpersona) {
                await axios.post('http://localhost:3002/api/persona/guardaryeditar', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                await axios.post('http://localhost:3002/api/persona/guardaryeditar', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            setIsFormOpen(false);
            fetchPacientes();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <Container>
            <h1>Pacientes</h1>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                Agregar
            </Button>
            <TextField
                label="Apellido Paterno o Materno o DNI"
                variant="outlined"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginLeft: 16 }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={fetchPacientes}>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
            />
            <TableContainer component={Paper} style={{ marginTop: 16 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Opciones</TableCell>
                            <TableCell>Apellido Paterno</TableCell>
                            <TableCell>Apellido Materno</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha de Nacimiento</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Estado Civil</TableCell>
                            <TableCell>Numero de Documento</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Teléfono</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map((paciente) => (
                            <TableRow key={paciente.idpersona}>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditClick(paciente.idpersona)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleHistoryClick(paciente.idpersona)}>
                                        <FileCopyIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{paciente.apaterno}</TableCell>
                                <TableCell>{paciente.amaterno}</TableCell>
                                <TableCell>{paciente.nombre}</TableCell>
                                <TableCell>{paciente.fecha_nacimiento}</TableCell>
                                <TableCell>{paciente.sexo}</TableCell>
                                <TableCell>{paciente.estado_civil}</TableCell>
                                <TableCell>{paciente.num_documento}</TableCell>
                                <TableCell>{paciente.direccion}</TableCell>
                                <TableCell>{paciente.telefono}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PacienteForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                paciente={selectedPaciente}
            />
            <PacienteHistory
                open={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                historia={historia}
            />
        </Container>
    );
};

export default Pacientes;
