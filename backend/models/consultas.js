const db = require('../config/db');

const Consultas = {
    listar: async (fechainicio, fechafin) => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) as paciente, a.fecha, a.hora, 
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idusuario) as registrador, 
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idempleado) as especialista, 
      s.nombre as servicio, a.costo, a.estado 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      INNER JOIN servicio s ON a.idservicio = s.idservicio 
      WHERE a.estado <> 'Anulado' AND a.fecha >= ? AND a.fecha <= ? 
      ORDER BY a.idatencion DESC`,
            [fechainicio, fechafin]
        );
        return rows;
    },

    listarHistorias: async (fechainicio, fechafin) => {
        const [rows] = await db.execute(
            `SELECT a.idatencion, a.idpersona, CONCAT(p.apaterno, ' ', p.amaterno, ' ', p.nombre) as paciente, a.fecha, a.hora, 
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idusuario) as registrador, 
      (SELECT CONCAT(apaterno, ' ', amaterno, ' ', nombre) FROM persona WHERE idpersona = a.idempleado) as especialista, 
      s.nombre as servicio, a.costo, a.estado 
      FROM atencion a 
      INNER JOIN persona p ON a.idpersona = p.idpersona 
      INNER JOIN servicio s ON a.idservicio = s.idservicio 
      WHERE a.estado = 'Atendido' AND a.fecha >= ? AND a.fecha <= ? 
      ORDER BY a.idatencion DESC`,
            [fechainicio, fechafin]
        );
        return rows;
    }
};

module.exports = Consultas;
