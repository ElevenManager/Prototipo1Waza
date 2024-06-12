const express = require('express');
const router = express.Router();
const Configuracion = require('../models/configuracion');

router.post('/guardaryeditar', async (req, res) => {
    const { idconfiguracion, razon_social, ruc, email, telefono, direccion, responsable } = req.body;
    try {
        let result;
        if (!idconfiguracion) {
            result = await Configuracion.insertar({ razon_social, ruc, email, telefono, direccion, responsable });
            res.status(200).json({ message: 'Configuración registrada', result });
        } else {
            result = await Configuracion.editar({ idconfiguracion, razon_social, ruc, email, telefono, direccion, responsable });
            res.status(200).json({ message: 'Configuración actualizada', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mostrar/:idconfiguracion', async (req, res) => {
    const { idconfiguracion } = req.params;
    try {
        const result = await Configuracion.mostrar(idconfiguracion);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const result = await Configuracion.listar();
        const data = result.map(reg => ({
            0: `<button title="Editar" class="btn btn-warning" onclick="mostrar(${reg.idconfiguracion})"><i class="fa fa-pencil"></i></button>`,
            1: reg.razon_social,
            2: reg.ruc,
            3: reg.email,
            4: reg.telefono,
            5: reg.direccion,
            6: reg.responsable
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

module.exports = router;
