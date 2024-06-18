const Servicio = require('../models/servicio');

exports.guardaryeditar = async (req, res) => {
    const { idservicio, nombre, costo, categoria } = req.body;

    try {
        let result;
        if (!idservicio) {
            result = await Servicio.insertar(nombre, costo, categoria);
            res.status(200).json({ message: 'Servicio registrado', result });
        } else {
            result = await Servicio.editar(idservicio, nombre, costo, categoria);
            res.status(200).json({ message: 'Servicio actualizado', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.desactivar = async (req, res) => {
    const { idservicio } = req.body;

    try {
        const result = await Servicio.desactivar(idservicio);
        res.status(200).json({ message: 'Servicio desactivado', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.activar = async (req, res) => {
    const { idservicio } = req.body;

    try {
        const result = await Servicio.activar(idservicio);
        res.status(200).json({ message: 'Servicio activado', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.mostrar = async (req, res) => {
    const { idservicio } = req.params;

    try {
        const result = await Servicio.mostrar(idservicio);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const result = await Servicio.listar();
        const data = result.map(reg => ({
            idservicio: reg.idservicio,
            nombre: reg.nombre,
            costo: reg.costo,
            condicion: reg.condicion,
            categoria: reg.categoria
        }));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
