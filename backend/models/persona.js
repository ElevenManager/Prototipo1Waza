const db = require('../config/db');

const Persona = {
    insertar: async (params) => {
        const {
            apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, alergia, intervenciones_quirurgicas,
            vacunas_completas, tipo_documento, num_documento, direccion, telefono, email, ocupacion, persona_responsable
        } = params;

        const [result] = await db.execute(
            `INSERT INTO persona (apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, alergia, intervenciones_quirurgicas,
        vacunas_completas, tipo_documento, num_documento, direccion, telefono, email, ocupacion, persona_responsable)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, alergia, intervenciones_quirurgicas, vacunas_completas,
                tipo_documento, num_documento, direccion, telefono, email, ocupacion, persona_responsable]
        );

        return result.insertId;
    },

    editar: async (params) => {
        const {
            idpersona, apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, alergia, intervenciones_quirurgicas,
            vacunas_completas, tipo_documento, num_documento, direccion, telefono, email, ocupacion, persona_responsable
        } = params;

        await db.execute(
            `UPDATE persona SET apaterno=?, amaterno=?, nombre=?, fecha_nacimiento=?, sexo=?, estado_civil=?, alergia=?, 
       intervenciones_quirurgicas=?, vacunas_completas=?, tipo_documento=?, num_documento=?, direccion=?, telefono=?, email=?, 
       ocupacion=?, persona_responsable=? WHERE idpersona=?`,
            [apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, alergia, intervenciones_quirurgicas, vacunas_completas,
                tipo_documento, num_documento, direccion, telefono, email, ocupacion, persona_responsable, idpersona]
        );

        return true;
    },

    eliminar: async (idpersona) => {
        await db.execute(`DELETE FROM persona WHERE idpersona=?`, [idpersona]);
        return true;
    },

    mostrar: async (idpersona) => {
        const [rows] = await db.execute(`SELECT * FROM persona WHERE idpersona=?`, [idpersona]);
        return rows[0];
    },

    listarp: async () => {
        const [rows] = await db.execute(`SELECT idpersona, CONCAT(apaterno, ' ', amaterno, ' ', nombre, ' - ', num_documento) as paciente FROM persona`);
        return rows;
    },

    listar: async (texto) => {
        const [rows] = await db.execute(
            `SELECT * FROM persona WHERE apaterno LIKE CONCAT('%', ?, '%') OR amaterno LIKE CONCAT('%', ?, '%') OR num_documento=? ORDER BY apaterno ASC, amaterno ASC LIMIT 200`,
            [texto, texto, texto]
        );
        return rows;
    },

    buscar: async (num_documento) => {
        const [rows] = await db.execute(`SELECT idpersona, apaterno, amaterno, nombre, tipo_documento, num_documento FROM persona WHERE num_documento=?`, [num_documento]);
        return rows[0];
    },

    select: async () => {
        const [rows] = await db.execute(
            `SELECT p.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) as especialista, p.ocupacion 
       FROM persona p INNER JOIN usuario u ON u.idusuario=p.idpersona`
        );
        return rows;
    },

    imprimirHistoria: async (idatencion) => {
        const sql = `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) as paciente, p.fecha_nacimiento,
      CONCAT(
        (YEAR(CURDATE()) - YEAR(fecha_nacimiento) - IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1, 
        IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0))), ' años, ', 
        (MONTH(CURDATE()) - MONTH(fecha_nacimiento) + 12 * IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1, 
        IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0)) - 
        IF(MONTH(CURDATE()) <> MONTH(fecha_nacimiento), (DAY(CURDATE()) < DAY(fecha_nacimiento)), 
        IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0))), ' meses, ', 
        (DAY(CURDATE()) - DAY(fecha_nacimiento) + 30 * (DAY(CURDATE()) < DAY(fecha_nacimiento))), ' días') as edad,
      p.sexo, p.estado_civil, p.alergia, p.intervenciones_quirurgicas, p.vacunas_completas, p.direccion, p.telefono, p.num_documento,
      p.ocupacion, p.persona_responsable, r.fecha, r.hora, 
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona=a.idusuario) as registrador,
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona=a.idempleado) as especialista,
      s.nombre as servicio, a.costo, a.estado, t.presion_arterial, t.temperatura, t.frecuencia_respiratoria, t.frecuencia_cardiaca,
      t.saturacion, t.peso, t.talla, t.imc, r.motivo_consulta, r.tiempo_enfermedad, r.antecedentes, r.tbc, r.hepatitisb, r.hipertencion,
      r.cirugias, r.dm, r.cm, r.regional, r.examenes, r.diagnosticopre, r.examen_fisico, r.tratamiento, r.proxima_cita, r.plan 
      FROM atencion a INNER JOIN persona p ON a.idpersona=p.idpersona 
      INNER JOIN servicio s ON a.idservicio=s.idservicio 
      INNER JOIN triaje t ON a.idatencion=t.idatencion 
      INNER JOIN resultado r ON a.idatencion=r.idatencion 
      WHERE a.idatencion=? LIMIT 1`;
        const [rows] = await db.execute(sql, [idatencion]);
        return rows[0];
    },

    imprimirDetalleHistoria: async (idatencion) => {
        const sql = `SELECT dd.tipo, d.enfermedad, d.codigo 
      FROM detalle_diagnostico dd 
      INNER JOIN diagnostico d ON d.iddiagnostico=dd.iddiagnostico 
      INNER JOIN resultado r ON dd.idresultado=r.idresultado 
      INNER JOIN atencion a ON a.idatencion=r.idatencion 
      WHERE a.idatencion=?`;
        const [rows] = await db.execute(sql, [idatencion]);
        return rows;
    },

    imprimirReceta: async (idatencion) => {
        const sql = `SELECT medicamento, presentacion, dosis, duracion, cantidad 
      FROM receta WHERE idatencion=?`;
        const [rows] = await db.execute(sql, [idatencion]);
        return rows;
    },

    imprimirCabeceraHistoria: async (idpersona) => {
        const sql = `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) as paciente, p.fecha_nacimiento,
      CONCAT(
        (YEAR(CURDATE()) - YEAR(fecha_nacimiento) - IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1, 
        IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0))), ' años, ', 
        (MONTH(CURDATE()) - MONTH(fecha_nacimiento) + 12 * IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1, 
        IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0)) - 
        IF(MONTH(CURDATE()) <> MONTH(fecha_nacimiento), (DAY(CURDATE()) < DAY(fecha_nacimiento)), 
        IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0))), ' meses, ', 
        (DAY(CURDATE()) - DAY(fecha_nacimiento) + 30 * (DAY(CURDATE()) < DAY(fecha_nacimiento))), ' días') as edad,
      p.sexo, p.estado_civil, p.alergia, p.intervenciones_quirurgicas, p.vacunas_completas, p.direccion, p.num_documento, p.ocupacion,
      p.persona_responsable 
      FROM atencion a INNER JOIN persona p ON a.idpersona=p.idpersona 
      WHERE a.idpersona=?`;
        const [rows] = await db.execute(sql, [idpersona]);
        return rows[0];
    },

    imprimirAtencionHistoria: async (idpersona) => {
        const sql = `SELECT a.idatencion, a.idpersona, a.fecha, a.hora, 
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona=a.idusuario) as registrador,
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona=a.idempleado) as especialista,
      s.nombre as servicio, a.costo, a.estado, t.presion_arterial, t.temperatura, t.frecuencia_respiratoria, t.frecuencia_cardiaca,
      t.saturacion, t.peso, t.talla, t.imc, r.motivo_consulta, r.tiempo_enfermedad, r.antecedentes, r.tbc, r.hepatitisb, r.hipertencion,
      r.cirugias, r.dm, r.cm, r.regional, r.examenes, r.diagnosticopre, r.examen_fisico, r.tratamiento, r.proxima_cita, r.plan 
      FROM atencion a INNER JOIN servicio s ON a.idservicio=s.idservicio 
      INNER JOIN triaje t ON a.idatencion=t.idatencion 
      INNER JOIN resultado r ON a.idatencion=r.idatencion 
      WHERE a.idpersona=?`;
        const [rows] = await db.execute(sql, [idpersona]);
        return rows;
    },
};

module.exports = Persona;
