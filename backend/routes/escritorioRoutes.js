const express = require('express');
const router = express.Router();
const { listarTriaje, listarPlan } = require('../controllers/escritorioController');

// Rutas para obtener los datos de Triaje y Plan
router.post('/listarTriaje', listarTriaje);
router.post('/listarPlan', listarPlan);

module.exports = router;
