const express = require('express');
const router = express.Router();
const Atencion = require('../models/atencion');
const Servicio = require('../models/servicio');
const Persona = require('../models/persona');

router.post('/guardaryeditar', async (req, res) => {
    const { idatencion, idpersona, idusuario, idservicio, idempleado, costo } = req.body;
    try {
        let result;
        if (!idatencion) {
            result = await Atencion.insertar({ idpersona, idusuario, idservicio, idempleado, costo });
            res.status(200).json({ message: 'Atención registrada', result });
        } else {
            result = await Atencion.editar({ idatencion, idpersona, idusuario, idservicio, idempleado, costo });
            res.status(200).json({ message: 'Atención actualizada', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/anular', async (req, res) => {
    const { idatencion } = req.body;
    try {
        const result = await Atencion.anular(idatencion);
        res.status(200).json({ message: result ? 'Atención Anulada' : 'Atención no se puede anular' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mostrar/:idatencion', async (req, res) => {
    const { idatencion } = req.params;
    try {
        const result = await Atencion.mostrar(idatencion);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const result = await Atencion.listar();
        const data = result.map(reg => ({
            0: (reg.estado !== 'Atendido')
                ? `<button title="Editar Atención" class="btn btn-warning" onclick="mostrar(${reg.idatencion})"><i class="fa fa-pencil"></i></button>
                   <button title="Anular Atención" class="btn btn-danger" onclick="anular(${reg.idatencion})"><i class="fa fa-close"></i></button>`
                : `<button title="Modificar Plan de Atención" class="btn btn-info" onclick="modificar(${reg.idatencion})"><i class="fa fa-eye"></i></button>`,
            1: `${reg.fecha} - ${reg.hora}`,
            2: reg.registrador,
            3: reg.servicio,
            4: reg.especialista,
            5: reg.paciente,
            6: reg.num_documento,
            7: reg.edad,
            8: reg.costo,
            9: (reg.estado === 'Registrado')
                ? '<span class="label bg-green">Registrado</span>'
                : (reg.estado === 'Triaje')
                    ? '<span class="label bg-orange">Triaje</span>'
                    : '<span class="label bg-primary">Atendido</span>'
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

router.get('/selectServicio', async (req, res) => {
    try {
        const result = await Servicio.select();
        const options = result.map(reg => `<option value=${reg.idservicio}>${reg.nombre} S/.${reg.costo}</option>`);
        res.status(200).send(options.join(''));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/selectEspecialista', async (req, res) => {
    try {
        const result = await Persona.select();
        const options = result.map(reg => `<option value=${reg.idpersona}>${reg.especialista} [ ${reg.ocupacion} ]</option>`);
        res.status(200).send(options.join(''));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/ListarAtenciones/:idp', async (req, res) => {
    const { idp } = req.params;
    try {
        const result = await Atencion.listarAtenciones(idp);
        let responseHtml = `
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Historia</th>
                    <th>Receta</th>
                </tr>
            </thead>`;

        result.forEach(reg => {
            responseHtml += `
                <tr>
                    <td>${reg.fecha}</td>
                    <td><a target="_blank" href="../reportes/historia.php?idatencion=${reg.idatencion}">${reg.idatencion}</a></td>
                    <td><a target="_blank" href="../reportes/receta.php?idatencion=${reg.idatencion}">${reg.idatencion}</a></td>
                </tr>`;
        });

        res.send(responseHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
