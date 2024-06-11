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
            0: reg.condicion ? `<button title="Editar" class="btn btn-warning" onclick="mostrar(${reg.idservicio})"><i class="fa fa-pencil"></i></button>
                                 <button title="Desactivar" class="btn btn-danger" onclick="desactivar(${reg.idservicio})"><i class="fa fa-close"></i></button>` :
                `<button title="Editar" class="btn btn-warning" onclick="mostrar(${reg.idservicio})"><i class="fa fa-pencil"></i></button>
                                <button title="Activar" class="btn btn-primary" onclick="activar(${reg.idservicio})"><i class="fa fa-check"></i></button>`,
            1: reg.nombre,
            2: reg.costo,
            3: reg.condicion ? '<span class="label bg-green">Activado</span>' : '<span class="label bg-red">Desactivado</span>',
            4: reg.categoria
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
};
