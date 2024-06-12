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
        if (!idpersona) {
            const result = await Persona.insertar({
                apaterno: limpiarCadena(apaterno),
                amaterno: limpiarCadena(amaterno),
                nombre: limpiarCadena(nombre),
                fecha_nacimiento: limpiarCadena(fecha_nacimiento),
                sexo: limpiarCadena(sexo),
                estado_civil: limpiarCadena(estado_civil),
                alergia: limpiarCadena(alergia),
                intervenciones_quirurgicas: limpiarCadena(intervenciones_quirurgicas),
                vacunas_completas: limpiarCadena(vacunas_completas),
                tipo_documento: limpiarCadena(tipo_documento),
                num_documento: limpiarCadena(num_documento),
                direccion: limpiarCadena(direccion),
                telefono: limpiarCadena(telefono),
                email: limpiarCadena(email),
                ocupacion: limpiarCadena(ocupacion),
                persona_responsable: limpiarCadena(persona_responsable)
            });
            res.status(200).json({ message: "Paciente registrado", result });
        } else {
            const result = await Persona.editar({
                idpersona,
                apaterno: limpiarCadena(apaterno),
                amaterno: limpiarCadena(amaterno),
                nombre: limpiarCadena(nombre),
                fecha_nacimiento: limpiarCadena(fecha_nacimiento),
                sexo: limpiarCadena(sexo),
                estado_civil: limpiarCadena(estado_civil),
                alergia: limpiarCadena(alergia),
                intervenciones_quirurgicas: limpiarCadena(intervenciones_quirurgicas),
                vacunas_completas: limpiarCadena(vacunas_completas),
                tipo_documento: limpiarCadena(tipo_documento),
                num_documento: limpiarCadena(num_documento),
                direccion: limpiarCadena(direccion),
                telefono: limpiarCadena(telefono),
                email: limpiarCadena(email),
                ocupacion: limpiarCadena(ocupacion),
                persona_responsable: limpiarCadena(persona_responsable)
            });
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
            0: `<button title="Editar" class="btn btn-warning" onclick="mostrar(${reg.idpersona})"><i class="fa fa-pencil"></i></button> <button title="Historia Clínicas" class="btn btn-info" onclick="historia(${reg.idpersona})"><i class="fa fa-file"></i></button>`,
            1: reg.apaterno,
            2: reg.amaterno,
            3: reg.nombre,
            4: reg.fecha_nacimiento,
            5: reg.sexo,
            6: reg.estado_civil,
            7: reg.num_documento,
            8: reg.direccion,
            9: reg.telefono
        }));
        const results = {
            sEcho: 1,
            iTotalRecords: data.length,
            iTotalDisplayRecords: data.length,
            aaData: data
        };
        res.status(200).json(results);
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
