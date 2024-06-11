const Resultado = require('../models/resultado');
const Atencion = require('../models/atencion');
const Diagnostico = require('../models/diagnostico');

exports.guardaryeditar = async (req, res) => {
    const {
        idresultado,
        idatencion,
        idatencionp,
        presion_arterial,
        temperatura,
        frecuencia_respiratoria,
        frecuencia_cardiaca,
        saturacion,
        peso,
        talla,
        imc,
        motivo_consulta,
        tiempo_enfermedad,
        antecedentes,
        tbc,
        hepatitisb,
        hipertencion,
        cirugias,
        dm,
        cm,
        examenes,
        regional,
        diagnosticopre,
        examen_fisico,
        tratamiento,
        proxima_cita,
        plan,
        alergia,
        intervenciones_quirurgicas,
        vacunas_completas,
        idpersona,
        iddiagnostico,
        tipo,
        medicamento,
        presentacion,
        dosis,
        duracion,
        cantidad
    } = req.body;

    try {
        let result;
        if (!idresultado) {
            result = await Resultado.insertar(
                idatencion,
                motivo_consulta,
                tiempo_enfermedad,
                antecedentes,
                tbc,
                hepatitisb,
                hipertencion,
                cirugias,
                dm,
                cm,
                examenes,
                regional,
                diagnosticopre,
                examen_fisico,
                tratamiento,
                proxima_cita,
                iddiagnostico,
                tipo,
                plan,
                alergia,
                intervenciones_quirurgicas,
                vacunas_completas,
                idpersona,
                medicamento,
                presentacion,
                dosis,
                duracion,
                cantidad,
                presion_arterial,
                temperatura,
                frecuencia_respiratoria,
                frecuencia_cardiaca,
                saturacion,
                peso,
                talla,
                imc
            );
            res.status(200).json({ message: 'Plan de Atención registrado', result });
        } else {
            result = await Resultado.editar(
                idatencionp,
                idresultado,
                motivo_consulta,
                tiempo_enfermedad,
                antecedentes,
                tbc,
                hepatitisb,
                hipertencion,
                cirugias,
                dm,
                cm,
                examenes,
                regional,
                diagnosticopre,
                examen_fisico,
                tratamiento,
                proxima_cita,
                iddiagnostico,
                tipo,
                plan,
                alergia,
                intervenciones_quirurgicas,
                vacunas_completas,
                idpersona,
                medicamento,
                presentacion,
                dosis,
                duracion,
                cantidad,
                presion_arterial,
                temperatura,
                frecuencia_respiratoria,
                frecuencia_cardiaca,
                saturacion,
                peso,
                talla,
                imc
            );
            res.status(200).json({ message: 'Plan de Atención Actualizado', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.mostrar = async (req, res) => {
    const { idatencion } = req.params;

    try {
        const result = await Resultado.mostrar(idatencion);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    const { idatencion } = req.params;

    try {
        const result = await Resultado.modificar(idatencion);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const result = await Atencion.listarPlan();
        const data = result.map(reg => ({
            0: `<button title="Atender especialista" class="btn btn-info" onclick="mostrar(${reg.idatencion})"><i class="fa fa-eye"></i></button>`,
            1: `${reg.fecha} - ${reg.hora}`,
            2: reg.registrador,
            3: reg.servicio,
            4: reg.especialista,
            5: reg.paciente,
            6: reg.costo,
            7: reg.estado === 'Anulado' ? '<span class="label bg-red">Anulado</span>' : '<span class="label bg-orange">' + reg.estado + '</span>'
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

exports.diagnosticos = async (req, res) => {
    const { texto } = req.params;

    try {
        const result = await Diagnostico.listarDiagnostico(texto);
        const diagnosticos = result.map(reg => `<li><button type="button" class="btn btn-warning btn-sm" onclick="agregar(${reg.iddiagnostico},'${reg.nenfermedad}')"><i class="fa fa-plus"></i></button>&nbsp;${reg.nenfermedad}</li>`);
        res.status(200).json(diagnosticos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.detalles = async (req, res) => {
    const { idresultado } = req.params;

    try {
        const result = await Resultado.listarDetalles(idresultado);
        const detalles = result.map((reg, index) => {
            let opciones = '';
            if (reg.tipo === 'P') {
                opciones = '<option value="P" selected>P</option><option value="D">D</option><option value="R">R</option>';
            } else if (reg.tipo === 'D') {
                opciones = '<option value="P">P</option><option value="D" selected>D</option><option value="R">R</option>';
            } else {
                opciones = '<option value="P">P</option><option value="D">D</option><option value="R" selected>R</option>';
            }

            return `<tr class="filas" id="fila${index + 100}">
                        <td><button type="button" class="btn btn-danger" onclick="eliminarDetalle(${index + 100})"><i class="fa fa-trash"></i></button></td>
                        <td><select name="tipo[]">${opciones}</select></td>
                        <td><input type="hidden" name="iddiagnostico[]" value="${reg.iddiagnostico}">${reg.nenfermedad}</td>
                    </tr>`;
        });
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.recetas = async (req, res) => {
    const { idatencion } = req.params;

    try {
        const result = await Resultado.listarRecetas(idatencion);
        const recetas = result.map((reg, index) => `
            <tr class="filasr" id="filar${index + 100}">
                <td><button type="button" class="btn btn-sm btn-danger" onclick="eliminarReceta(${index + 100})"><i class="fa fa-trash"></i></button></td>
                <td><input type="text" class="control" name="medicamento[]" value="${reg.medicamento}" required=""></td>
                <td><input type="text" class="control" name="presentacion[]" value="${reg.presentacion}"></td>
                <td><input type="text" class="control" name="dosis[]" value="${reg.dosis}"></td>
                <td><input type="text" class="control" name="duracion[]" value="${reg.duracion}"></td>
                <td><input type="text" class="control" name="cantidad[]" value="${reg.cantidad}"></td>
            </tr>
        `);
        res.status(200).json(recetas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
