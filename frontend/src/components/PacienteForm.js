import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem
} from '@mui/material';

const PacienteForm = ({ open, onClose, onSave, paciente }) => {
    const [formData, setFormData] = useState({
        idpersona: '',
        apaterno: '',
        amaterno: '',
        nombre: '',
        fecha_nacimiento: '',
        sexo: 'M',
        estado_civil: 'S',
        alergia: '',
        intervenciones_quirurgicas: '',
        vacunas_completas: 'SI',
        tipo_documento: 'DNI',
        num_documento: '',
        direccion: '',
        telefono: '',
        email: '',
        ocupacion: '',
        persona_responsable: ''
    });

    useEffect(() => {
        if (paciente) {
            // Convertir fecha_nacimiento a 'yyyy-MM-dd'
            const fechaNacimiento = paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toISOString().split('T')[0] : '';
            setFormData({
                ...paciente,
                fecha_nacimiento: fechaNacimiento,
                tipo_documento: paciente.tipo_documento || 'DNI',  // Asegurarse que el tipo_documento no sea undefined
                vacunas_completas: paciente.vacunas_completas || 'SI'  // Asegurarse que vacunas_completas no sea undefined
            });
        } else {
            setFormData({
                idpersona: '',
                apaterno: '',
                amaterno: '',
                nombre: '',
                fecha_nacimiento: '',
                sexo: 'M',
                estado_civil: 'S',
                alergia: '',
                intervenciones_quirurgicas: '',
                vacunas_completas: 'SI',
                tipo_documento: 'DNI',
                num_documento: '',
                direccion: '',
                telefono: '',
                email: '',
                ocupacion: '',
                persona_responsable: ''
            });
        }
    }, [paciente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{formData.idpersona ? 'Editar Paciente' : 'Agregar Paciente'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField name="apaterno" label="Apellido Paterno" value={formData.apaterno} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="amaterno" label="Apellido Materno" value={formData.amaterno} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="nombre" label="Nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="fecha_nacimiento" label="Fecha de Nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
                    <TextField name="sexo" label="Sexo" select value={formData.sexo} onChange={handleChange} fullWidth margin="normal" required>
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Femenino</MenuItem>
                    </TextField>
                    <TextField name="estado_civil" label="Estado Civil" select value={formData.estado_civil} onChange={handleChange} fullWidth margin="normal" required>
                        <MenuItem value="S">Soltero</MenuItem>
                        <MenuItem value="C">Casado</MenuItem>
                        <MenuItem value="V">Viudo</MenuItem>
                        <MenuItem value="D">Divorciado</MenuItem>
                    </TextField>
                    <TextField name="tipo_documento" label="Tipo Documento" select value={formData.tipo_documento} onChange={handleChange} fullWidth margin="normal" required>
                        <MenuItem value="DNI">DNI</MenuItem>
                        <MenuItem value="RUC">RUC</MenuItem>
                        <MenuItem value="CEDULA">CEDULA</MenuItem>
                    </TextField>
                    <TextField name="num_documento" label="Número Documento" value={formData.num_documento} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="direccion" label="Dirección" value={formData.direccion} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="telefono" label="Teléfono" value={formData.telefono} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="ocupacion" label="Ocupación" value={formData.ocupacion} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="persona_responsable" label="Persona Responsable" value={formData.persona_responsable} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="alergia" label="Alergias" value={formData.alergia} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="intervenciones_quirurgicas" label="Intervenciones Quirúrgicas" value={formData.intervenciones_quirurgicas} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="vacunas_completas" label="Vacunas Completas" select value={formData.vacunas_completas} onChange={handleChange} fullWidth margin="normal" required>
                        <MenuItem value="SI">SI</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                    </TextField>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancelar</Button>
                <Button onClick={handleSubmit} color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PacienteForm;
