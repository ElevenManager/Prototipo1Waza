const Triaje = require('../models/triaje');
const Atencion = require('../models/atencion');

exports.guardaryeditar = async (req, res) => {
    const { idtriaje, idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc } = req.body;

    try {
        let result;
        if (!idtriaje) {
            result = await Triaje.insertar(idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc);
            res.status(200).json({ message: 'Triaje registrado', result });
        } else {
            result = await Triaje.editar(idtriaje, idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc);
            res.status(200).json({ message: 'Triaje actualizado', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.mostrar = async (req, res) => {
    const { idatencion } = req.params;

    try {
        const result = await Triaje.mostrar(idatencion);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const result = await Atencion.listarTriaje();
        const data = result.map(reg => ({
            0: `<button title="Pasar a Triaje" class="btn btn-info" onclick="mostrar(${reg.idatencion})"><i class="fa fa-eye"></i></button>`,
            1: `${reg.fecha} - ${reg.hora}`,
            2: reg.registrador,
            3: reg.servicio,
            4: reg.especialista,
            5: reg.paciente,
            6: reg.costo,
            7: reg.estado === 'Anulado' ? '<span class="label bg-red">Anulado</span>' : `<span class="label bg-blue">${reg.estado}</span>`
        }));

        const results = {
            sEcho: 1,
            icostoRecords: data.length,
            icostoDisplayRecords: data.length,
            aaData: data
        };

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
