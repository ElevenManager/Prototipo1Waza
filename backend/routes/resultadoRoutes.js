const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultadoController');

router.post('/guardaryeditar', resultadoController.guardaryeditar);
router.get('/mostrar/:idatencion', resultadoController.mostrar);
router.get('/modificar/:idatencion', resultadoController.modificar);
router.get('/listar', resultadoController.listar);
router.get('/diagnosticos/:texto', resultadoController.diagnosticos);
router.get('/detalles/:idresultado', resultadoController.detalles);
router.get('/recetas/:idatencion', resultadoController.recetas);

module.exports = router;
