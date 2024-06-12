const Atencion = require('../models/atencion');

exports.listarTriaje = async (req, res) => {
    try {
        const result = await Atencion.listarEscritorioTriaje();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listarPlan = async (req, res) => {
    try {
        const result = await Atencion.listarEscritorioPlan();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
