import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PacienteHistory = ({ open, onClose, historia }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Historia del Paciente</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Historia</TableCell>
                                <TableCell>Receta</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historia.map((historiaItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>{historiaItem.fecha}</TableCell>
                                    <TableCell>
                                        <a href={`el reporte va aqui`} target="_blank" rel="noopener noreferrer">
                                            {historiaItem.idatencion}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href={`el reporte va aqui`} target="_blank" rel="noopener noreferrer">
                                            {historiaItem.idatencion}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PacienteHistory;
