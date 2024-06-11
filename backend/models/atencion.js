const db = require('../config/db');

const Atencion = {
    insertar: async (idpersona, idusuario, idservicio, idempleado, costo) => {
        const [result] = await db.execute(
            `INSERT INTO atencion (idpersona, idusuario, fecha, hora, idservicio, idempleado, costo, estado) 
      VALUES (?, ?, CURDATE(), CURTIME(), ?, ?, ?, 'Registrado')`,
            [idpersona, idusuario, idservicio, idempleado, costo]
        );
        return result;
    },

    editar: async (idatencion, idpersona, idusuario, idservicio, idempleado, costo) => {
        const [result] = await db.execute(
            `UPDATE atencion SET idpersona = ?, idservicio = ?, idempleado = ?, costo = ? WHERE idatencion = ?`,
            [idpersona, idservicio, idempleado, costo, idatencion]
        );
        return result;
    },

    anular: async (idatencion) => {
        const [result] = await db.execute(
            `UPDATE atencion SET estado = 'Anulado' WHERE idatencion = ?`,
            [idatencion]
        );
        return result;
    },

    mostrar: async (idatencion) => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) AS paciente, 
        a.fecha, a.hora, a.idusuario, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idusuario) AS registrador, 
        a.idempleado, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idempleado) AS especialista, 
        a.idservicio, s.nombre AS servicio, a.costo, a.estado 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      INNER JOIN servicio s ON a.idservicio = s.idservicio 
      WHERE a.idatencion = ?`,
            [idatencion]
        );
        return rows[0];
    },

    listar: async () => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, a.idpersona, p.num_documento, 
        CONCAT((YEAR(CURDATE()) - YEAR(fecha_nacimiento) - IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1, 
          IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0))), ' años, ', 
          (MONTH(CURDATE()) - MONTH(fecha_nacimiento) + 12 * IF(MONTH(CURDATE()) < MONTH(fecha_nacimiento), 1, 
          IF(MONTH(CURDATE()) = MONTH(fecha_nacimiento), IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0), 0)) - 
          IF(MONTH(CURDATE()) <> MONTH(fecha_nacimiento), (DAY(CURDATE()) < DAY(fecha_nacimiento)), 
          IF(DAY(CURDATE()) < DAY(fecha_nacimiento), 1, 0))), ' meses, ', 
          (DAY(CURDATE()) - DAY(fecha_nacimiento) + 30 * (DAY(CURDATE()) < DAY(fecha_nacimiento))), ' días') AS edad, 
        CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) AS paciente, 
        a.fecha, a.hora, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idusuario) AS registrador, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idempleado) AS especialista, 
        s.nombre AS servicio, a.costo, a.estado 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      INNER JOIN servicio s ON a.idservicio = s.idservicio 
      WHERE a.estado <> 'Anulado' 
      ORDER BY a.idatencion DESC LIMIT 0, 100`
        );
        return rows;
    },

    listarTriaje: async () => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) AS paciente, 
        a.fecha, a.hora, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idusuario) AS registrador, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idempleado) AS especialista, 
        s.nombre AS servicio, a.costo, a.estado 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      INNER JOIN servicio s ON a.idservicio = s.idservicio 
      WHERE a.estado = 'Registrado' 
      ORDER BY a.idatencion ASC LIMIT 0, 100`
        );
        return rows;
    },

    listarPlan: async (idusuario) => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) AS paciente, 
        a.fecha, a.hora, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idusuario) AS registrador, 
        (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idempleado) AS especialista, 
        s.nombre AS servicio, a.costo, a.estado 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      INNER JOIN servicio s ON a.idservicio = s.idservicio 
      WHERE a.estado = 'Triaje' AND a.idempleado = ? 
      ORDER BY a.idatencion ASC LIMIT 0, 100`,
            [idusuario]
        );
        return rows;
    },

    listarEscritorioTriaje: async () => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) AS paciente 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      WHERE a.estado = 'Registrado' 
      ORDER BY a.idatencion ASC LIMIT 0, 100`
        );
        return rows;
    },

    listarEscritorioPlan: async () => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) AS paciente 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      WHERE a.estado = 'Triaje' 
      ORDER BY a.idatencion ASC LIMIT 0, 100`
        );
        return rows;
    },

    select: async () => {
        const [rows] = await db.execute(`SELECT * FROM atencion WHERE condicion = 1`);
        return rows;
    },

    listarAtenciones: async (idpersona) => {
        const [rows] = await db.execute(
            `SELECT idatencion, fecha 
      FROM atencion 
      WHERE idpersona = ?`,
            [idpersona]
        );
        return rows;
    }
};

module.exports = Atencion;
