const express = require('express');
const router = express.Router();
const Permiso = require('../models/permiso');

router.get('/listar', async (req, res) => {
    try {
        const result = await Permiso.listar();
        const data = result.map(reg => ({
            0: reg.nombre
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
