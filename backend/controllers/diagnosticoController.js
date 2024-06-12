const express = require('express');
const router = express.Router();
const Diagnostico = require('../models/diagnostico');

router.post('/guardaryeditar', async (req, res) => {
    const { iddiagnostico, codigo, enfermedad } = req.body;
    try {
        let result;
        if (!iddiagnostico) {
            result = await Diagnostico.insertar(codigo, enfermedad);
            res.status(200).json({ message: 'Diagnóstico registrado', result });
        } else {
            result = await Diagnostico.editar(iddiagnostico, codigo, enfermedad);
            res.status(200).json({ message: 'Diagnóstico actualizado', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/eliminar', async (req, res) => {
    const { iddiagnostico } = req.body;
    try {
        const result = await Diagnostico.eliminar(iddiagnostico);
        res.status(200).json({ message: 'Diagnóstico eliminado', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mostrar/:iddiagnostico', async (req, res) => {
    const { iddiagnostico } = req.params;
    try {
        const result = await Diagnostico.mostrar(iddiagnostico);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/listar', async (req, res) => {
    const { texto } = req.query;
    try {
        const result = await Diagnostico.listar(texto);
        const data = result.map(reg => ({
            0: `<button title="Editar" class="btn btn-warning" onclick="mostrar(${reg.iddiagnostico})"><i class="fa fa-pencil"></i></button>
                <button title="Eliminar" class="btn btn-danger" onclick="eliminar(${reg.iddiagnostico})"><i class="fa fa-close"></i></button>`,
            1: reg.codigo,
            2: reg.enfermedad
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
