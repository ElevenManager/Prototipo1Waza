const db = require('../config/db');

const Resultado = {
    insertar: async (params) => {
        const {
            idatencion, motivo_consulta, tiempo_enfermedad, antecedentes, tbc, hepatitisb, hipertencion, cirugias,
            dm, cm, regional, examenes, diagnosticopre, examen_fisico, tratamiento, proxima_cita, iddiagnostico, tipo,
            plan, alergia, intervenciones_quirurgicas, vacunas_completas, idpersona, medicamento, presentacion,
            dosis, duracion, cantidad, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca,
            saturacion, peso, talla, imc
        } = params;

        // Actualizamos el estado de la atención
        await db.execute("UPDATE atencion SET estado='Atendido' WHERE idatencion=?", [idatencion]);

        // Insertamos el resultado
        const [result] = await db.execute(
            `INSERT INTO resultado (idatencion, motivo_consulta, tiempo_enfermedad, antecedentes, tbc, hepatitisb, hipertencion, cirugias, dm, cm, regional, examenes, diagnosticopre, examen_fisico, tratamiento, proxima_cita, estado, plan, fecha, hora)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Atendido', ?, CURDATE(), CURTIME())`,
            [idatencion, motivo_consulta, tiempo_enfermedad, antecedentes, tbc, hepatitisb, hipertencion, cirugias, dm, cm, regional, examenes, diagnosticopre, examen_fisico, tratamiento, proxima_cita, plan]
        );
        const idresultadonew = result.insertId;

        // Insertamos los diagnósticos
        const diagnosticoQueries = iddiagnostico.map((id, index) => db.execute(
            `INSERT INTO detalle_diagnostico (idresultado, iddiagnostico, tipo) VALUES (?, ?, ?)`,
            [idresultadonew, id, tipo[index]]
        ));
        await Promise.all(diagnosticoQueries);

        // Insertamos las recetas
        const recetaQueries = medicamento.map((med, index) => db.execute(
            `INSERT INTO receta (idatencion, medicamento, presentacion, dosis, duracion, cantidad) VALUES (?, ?, ?, ?, ?, ?)`,
            [idatencion, med, presentacion[index], dosis[index], duracion[index], cantidad[index]]
        ));
        await Promise.all(recetaQueries);

        // Actualizamos el paciente
        await db.execute(
            `UPDATE persona SET alergia=?, intervenciones_quirurgicas=?, vacunas_completas=? WHERE idpersona=?`,
            [alergia, intervenciones_quirurgicas, vacunas_completas, idpersona]
        );

        // Actualizamos el triaje
        await db.execute(
            `UPDATE triaje SET presion_arterial=?, temperatura=?, frecuencia_respiratoria=?, frecuencia_cardiaca=?, saturacion=?, peso=?, talla=?, imc=? WHERE idatencion=?`,
            [presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc, idatencion]
        );

        return true;
    },

    editar: async (params) => {
        const {
            idatencion, idresultado, motivo_consulta, tiempo_enfermedad, antecedentes, tbc, hepatitisb, hipertencion,
            cirugias, dm, cm, regional, examenes, diagnosticopre, examen_fisico, tratamiento, proxima_cita, iddiagnostico,
            tipo, plan, alergia, intervenciones_quirurgicas, vacunas_completas, idpersona, medicamento, presentacion,
            dosis, duracion, cantidad, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca,
            saturacion, peso, talla, imc
        } = params;

        // Actualizamos el resultado
        await db.execute(
            `UPDATE resultado SET motivo_consulta=?, tiempo_enfermedad=?, antecedentes=?, tbc=?, hepatitisb=?, hipertencion=?, cirugias=?, dm=?, cm=?, regional=?, examenes=?, diagnosticopre=?, examen_fisico=?, tratamiento=?, proxima_cita=?, plan=?, fecha=CURDATE(), hora=CURTIME() WHERE idresultado=?`,
            [motivo_consulta, tiempo_enfermedad, antecedentes, tbc, hepatitisb, hipertencion, cirugias, dm, cm, regional, examenes, diagnosticopre, examen_fisico, tratamiento, proxima_cita, plan, idresultado]
        );

        // Eliminamos los diagnósticos antiguos
        await db.execute(`DELETE FROM detalle_diagnostico WHERE idresultado=?`, [idresultado]);

        // Insertamos los nuevos diagnósticos
        const diagnosticoQueries = iddiagnostico.map((id, index) => db.execute(
            `INSERT INTO detalle_diagnostico (idresultado, iddiagnostico, tipo) VALUES (?, ?, ?)`,
            [idresultado, id, tipo[index]]
        ));
        await Promise.all(diagnosticoQueries);

        // Eliminamos las recetas antiguas
        await db.execute(`DELETE FROM receta WHERE idatencion=?`, [idatencion]);

        // Insertamos las nuevas recetas
        const recetaQueries = medicamento.map((med, index) => db.execute(
            `INSERT INTO receta (idatencion, medicamento, presentacion, dosis, duracion, cantidad) VALUES (?, ?, ?, ?, ?, ?)`,
            [idatencion, med, presentacion[index], dosis[index], duracion[index], cantidad[index]]
        ));
        await Promise.all(recetaQueries);

        // Actualizamos el paciente
        await db.execute(
            `UPDATE persona SET alergia=?, intervenciones_quirurgicas=?, vacunas_completas=? WHERE idpersona=?`,
            [alergia, intervenciones_quirurgicas, vacunas_completas, idpersona]
        );

        // Actualizamos el triaje
        await db.execute(
            `UPDATE triaje SET presion_arterial=?, temperatura=?, frecuencia_respiratoria=?, frecuencia_cardiaca=?, saturacion=?, peso=?, talla=?, imc=? WHERE idatencion=?`,
            [presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc, idatencion]
        );

        return true;
    },

    mostrar: async (idatencion) => {
        const sql = `SELECT a.idatencion, a.idpersona, concat(p.apaterno,' ',p.amaterno,' ',p.nombre) as paciente,
      CONCAT((YEAR(CURDATE()) - YEAR(fecha_nacimiento) - IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1,
      IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0))),
      ' años, ', (MONTH(CURDATE()) - MONTH(fecha_nacimiento) + 12 * IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1,
      IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0)) -
      IF(MONTH(CURDATE()) <> MONTH(fecha_nacimiento), (DAY(CURDATE()) < DAY(fecha_nacimiento)),
      IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0))), ' meses, ',
      (DAY(CURDATE()) - DAY(fecha_nacimiento) + 30 * (DAY(CURDATE()) < DAY(fecha_nacimiento))), ' días') as edad,
      p.num_documento, p.alergia, p.intervenciones_quirurgicas, p.vacunas_completas, a.fecha,
      (select concat(apaterno,' ',amaterno,' ',nombre) from persona where idpersona=a.idempleado) as especialista,
      s.nombre as servicio, t.presion_arterial, t.temperatura, t.frecuencia_respiratoria, t.frecuencia_cardiaca,
      t.saturacion, t.peso, t.talla, t.imc FROM atencion a INNER JOIN persona p ON a.idpersona=p.idpersona
      INNER JOIN servicio s on a.idservicio=s.idservicio INNER JOIN triaje t ON a.idatencion=t.idatencion
      WHERE a.idatencion=?`;
        const [rows] = await db.execute(sql, [idatencion]);
        return rows[0];
    },

    modificar: async (idatencion) => {
        const sql = `SELECT a.idatencion, a.idpersona, concat(p.apaterno,' ',p.amaterno,' ',p.nombre) as paciente,
      CONCAT((YEAR(CURDATE()) - YEAR(fecha_nacimiento) - IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1,
      IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0))),
      ' años, ', (MONTH(CURDATE()) - MONTH(fecha_nacimiento) + 12 * IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1,
      IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0)) -
      IF(MONTH(CURDATE()) <> MONTH(fecha_nacimiento), (DAY(CURDATE()) < DAY(fecha_nacimiento)),
      IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0))), ' meses, ',
      (DAY(CURDATE()) - DAY(fecha_nacimiento) + 30 * (DAY(CURDATE()) < DAY(fecha_nacimiento))), ' días') as edad,
      p.num_documento, p.alergia, p.intervenciones_quirurgicas, p.vacunas_completas, a.fecha,
      (select concat(apaterno,' ',amaterno,' ',nombre) from persona where idpersona=a.idempleado) as especialista,
      s.nombre as servicio, t.presion_arterial, t.temperatura, t.frecuencia_respiratoria, t.frecuencia_cardiaca,
      t.saturacion, t.peso, t.talla, t.imc, r.motivo_consulta, r.idresultado, r.tiempo_enfermedad, r.antecedentes,
      r.tbc, r.hepatitisb, r.hipertencion, r.cirugias, r.dm, r.cm, r.examenes, r.regional, r.diagnosticopre,
      r.examen_fisico, r.tratamiento, r.proxima_cita, r.plan FROM atencion a INNER JOIN persona p ON a.idpersona=p.idpersona
      INNER JOIN servicio s on a.idservicio=s.idservicio INNER JOIN triaje t ON a.idatencion=t.idatencion
      INNER JOIN resultado r ON a.idatencion=r.idatencion WHERE a.idatencion=?`;
        const [rows] = await db.execute(sql, [idatencion]);
        return rows[0];
    },

    listarRecetas: async (idatencion) => {
        const sql = `SELECT * FROM receta WHERE idatencion=?`;
        const [rows] = await db.execute(sql, [idatencion]);
        return rows;
    },

    listarDetalles: async (idresultado) => {
        const sql = `SELECT d.iddiagnostico, concat(d.codigo,'-',d.enfermedad) as nenfermedad, dd.tipo
      FROM detalle_diagnostico dd INNER JOIN diagnostico d ON d.iddiagnostico=dd.iddiagnostico
      WHERE idresultado=?`;
        const [rows] = await db.execute(sql, [idresultado]);
        return rows;
    },
};

module.exports = Resultado;
