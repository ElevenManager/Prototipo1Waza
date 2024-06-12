const express = require('express');
const router = express.Router();
const Consultas = require('../models/consultas');

router.get('/listar', async (req, res) => {
    const { fechainicio, fechafin } = req.query;
    try {
        const result = await Consultas.listar(fechainicio, fechafin);
        const data = result.map(reg => ({
            0: `${reg.fecha} - ${reg.hora}`,
            1: reg.registrador,
            2: reg.servicio,
            3: reg.especialista,
            4: reg.paciente,
            5: reg.costo,
            6: reg.estado === 'Anulado' ? '<span class="label bg-red">Anulado</span>' : '<span class="label bg-green">' + reg.estado + '</span>'
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

router.get('/listarHistorias', async (req, res) => {
    const { fechainicio, fechafin } = req.query;
    try {
        const result = await Consultas.listarHistorias(fechainicio, fechafin);
        const data = result.map(reg => ({
            0: `${reg.fecha} - ${reg.hora}`,
            1: reg.registrador,
            2: reg.servicio,
            3: reg.especialista,
            4: reg.paciente,
            5: reg.costo,
            6: `<a target="_blank" href="../reportes/historia.php?idatencion=${reg.idatencion}" ><button title="Historia Clínicas" class="btn btn-info"><i class="fa fa-file"></i> Historia</button></a> <a target="_blank" href="../reportes/receta.php?idatencion=${reg.idatencion}" ><button title="Receta Clínicas" class="btn btn-success"><i class="fa fa-print"></i> Receta </button></a>`
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
