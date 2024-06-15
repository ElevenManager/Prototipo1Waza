const express = require('express');
const router = express.Router();
const Configuracion = require('../models/configuracion');

// Middleware para limpiar los datos y manejar valores undefined
const limpiarCadena = (str) => (str ? str.toString().trim() : '');

router.post('/guardaryeditar', async (req, res) => {
    const { idconfiguracion, razon_social, ruc, email, telefono, direccion, responsable } = req.body;
    console.log('Request body:', req.body); // Log para depuración
    try {
        let result;
        if (!idconfiguracion) {
            result = await Configuracion.insertar(
                limpiarCadena(razon_social),
                limpiarCadena(ruc),
                limpiarCadena(email),
                limpiarCadena(telefono),
                limpiarCadena(direccion),
                limpiarCadena(responsable)
            );
            //console.log('Insert result:', result); // Log para depuración
            res.status(200).json({ message: 'Configuración registrada', result });
        } else {
            result = await Configuracion.editar(
                idconfiguracion,
                limpiarCadena(razon_social),
                limpiarCadena(ruc),
                limpiarCadena(email),
                limpiarCadena(telefono),
                limpiarCadena(direccion),
                limpiarCadena(responsable)
            );
            console.log('Edit result:', result); // Log para depuración
            res.status(200).json({ message: 'Configuración actualizada', result });
        }
    } catch (error) {
        //console.error("Error in /guardaryeditar:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/mostrar/:idconfiguracion', async (req, res) => {
    const { idconfiguracion } = req.params;
    try {
        const result = await Configuracion.mostrar(idconfiguracion);
        //console.log('Mostrar result:', result); // Log para depuración
        res.status(200).json(result);
    } catch (error) {
        //console.error("Error in /mostrar:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const result = await Configuracion.listar();
        //console.log('Listar result:', result); // Log para depuración
        res.status(200).json({ data: result });
    } catch (error) {
        //console.error("Error in /listar:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
