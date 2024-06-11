const express = require('express');
const router = express.Router();
const triajeController = require('../controllers/triajeController');

router.post('/guardaryeditar', triajeController.guardaryeditar);
router.get('/mostrar/:idatencion', triajeController.mostrar);
router.get('/listar', triajeController.listar);

module.exports = router;
