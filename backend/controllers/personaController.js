const express = require('express');
const router = express.Router();
const Persona = require('../models/persona');

// Middleware para limpiar los datos
const limpiarCadena = (str) => str ? str.toString().trim() : '';

router.post('/guardaryeditar', async (req, res) => {
    const {
        idpersona,
        apaterno,
        amaterno,
        nombre,
        fecha_nacimiento,
        sexo,
        estado_civil,
        alergia,
        intervenciones_quirurgicas,
        vacunas_completas,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        ocupacion,
        persona_responsable
    } = req.body;

    try {
        const personaData = {
            idpersona: limpiarCadena(idpersona) || null,
            apaterno: limpiarCadena(apaterno) || null,
            amaterno: limpiarCadena(amaterno) || null,
            nombre: limpiarCadena(nombre) || null,
            fecha_nacimiento: limpiarCadena(fecha_nacimiento) || null,
            sexo: limpiarCadena(sexo) || null,
            estado_civil: limpiarCadena(estado_civil) || null,
            alergia: limpiarCadena(alergia) || null,
            intervenciones_quirurgicas: limpiarCadena(intervenciones_quirurgicas) || null,
            vacunas_completas: limpiarCadena(vacunas_completas) || null,
            tipo_documento: limpiarCadena(tipo_documento) || null,
            num_documento: limpiarCadena(num_documento) || null,
            direccion: limpiarCadena(direccion) || null,
            telefono: limpiarCadena(telefono) || null,
            email: limpiarCadena(email) || null,
            ocupacion: limpiarCadena(ocupacion) || null,
            persona_responsable: limpiarCadena(persona_responsable) || null
        };

        let result;
        if (!idpersona) {
            result = await Persona.insertar(personaData);
            res.status(200).json({ message: "Paciente registrado", result });
        } else {
            result = await Persona.editar(personaData);
            res.status(200).json({ message: "Paciente actualizado", result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/desactivar', async (req, res) => {
    const { idpersona } = req.body;

    try {
        const result = await Persona.desactivar(idpersona);
        res.status(200).json({ message: "Paciente Desactivado", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/activar', async (req, res) => {
    const { idpersona } = req.body;

    try {
        const result = await Persona.activar(idpersona);
        res.status(200).json({ message: "Paciente activado", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mostrar/:idpersona', async (req, res) => {
    const { idpersona } = req.params;

    try {
        const result = await Persona.mostrar(idpersona);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/listar', async (req, res) => {
    const { texto } = req.query;

    try {
        const result = await Persona.listar(texto);
        const data = result.map((reg, index) => ({
            idpersona: reg.idpersona,
            apaterno: reg.apaterno,
            amaterno: reg.amaterno,
            nombre: reg.nombre,
            fecha_nacimiento: reg.fecha_nacimiento,
            sexo: reg.sexo,
            estado_civil: reg.estado_civil,
            num_documento: reg.num_documento,
            direccion: reg.direccion,
            telefono: reg.telefono
        }));
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/buscar', async (req, res) => {
    const { documento } = req.body;

    try {
        const result = await Persona.buscar(documento);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
