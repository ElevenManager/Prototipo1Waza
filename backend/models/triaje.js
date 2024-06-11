const db = require('../config/db');

const Triaje = {
    insertar: async (idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc) => {
        await db.execute(
            'UPDATE atencion SET estado = ? WHERE idatencion = ?',
            ['Triaje', idatencion]
        );

        const [result] = await db.execute(
            'INSERT INTO triaje (idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc, 'Triaje']
        );

        return result;
    },

    editar: async (idtriaje, idatencion, presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc) => {
        const [result] = await db.execute(
            'UPDATE triaje SET presion_arterial = ?, temperatura = ?, frecuencia_respiratoria = ?, frecuencia_cardiaca = ?, saturacion = ?, peso = ?, talla = ?, imc = ? WHERE idtriaje = ? AND idatencion = ?',
            [presion_arterial, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, saturacion, peso, talla, imc, idtriaje, idatencion]
        );

        return result;
    },

    mostrar: async (idatencion) => {
        const [rows] = await db.execute(
            'SELECT a.idatencion, a.idpersona, p.num_documento, CONCAT(p.apaterno, " ", p.amaterno, " ", p.nombre) AS paciente, p.fecha_nacimiento, CONCAT((YEAR(CURDATE()) - YEAR(p.fecha_nacimiento) - IF(MONTH(CURDATE()) < MONTH(p.fecha_nacimiento), 1, IF(MONTH(CURDATE()) = MONTH(p.fecha_nacimiento), IF(DAY(CURDATE()) < DAY(p.fecha_nacimiento), 1, 0), 0))), " años, ", (MONTH(CURDATE()) - MONTH(p.fecha_nacimiento) + 12 * IF(MONTH(CURDATE()) < MONTH(p.fecha_nacimiento), 1, IF(MONTH(CURDATE()) = MONTH(p.fecha_nacimiento), IF(DAY(CURDATE()) < DAY(p.fecha_nacimiento), 1, 0), 0)) - IF(MONTH(CURDATE()) <> MONTH(p.fecha_nacimiento), (DAY(CURDATE()) < DAY(p.fecha_nacimiento)), IF(DAY(CURDATE()) < DAY(p.fecha_nacimiento), 1, 0))), " meses, ", (DAY(CURDATE()) - DAY(p.fecha_nacimiento) + 30 * (DAY(CURDATE()) < DAY(p.fecha_nacimiento))), " días") AS edad, a.fecha, a.hora, (SELECT CONCAT(apaterno, " ", amaterno, " ", nombre) FROM persona WHERE idpersona = a.idusuario) AS registrador, (SELECT CONCAT(apaterno, " ", amaterno, " ", nombre) FROM persona WHERE idpersona = a.idempleado) AS especialista, s.nombre AS servicio, a.costo, a.estado FROM atencion a INNER JOIN persona p ON a.idpersona = p.idpersona INNER JOIN servicio s ON a.idservicio = s.idservicio WHERE a.idatencion = ?',
            [idatencion]
        );

        return rows[0];
    }
};

module.exports = Triaje;
