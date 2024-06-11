const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

router.post('/guardaryeditar', servicioController.guardaryeditar);
router.post('/desactivar', servicioController.desactivar);
router.post('/activar', servicioController.activar);
router.get('/mostrar/:idservicio', servicioController.mostrar);
router.get('/listar', servicioController.listar);

module.exports = router;
