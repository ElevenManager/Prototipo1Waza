const db = require('../config/db');

const Diagnostico = {
    insertar: async (codigo, enfermedad) => {
        const [result] = await db.execute(
            `INSERT INTO diagnostico (codigo, enfermedad) VALUES (?, ?)`,
            [codigo, enfermedad]
        );
        return result;
    },

    editar: async (iddiagnostico, codigo, enfermedad) => {
        const [result] = await db.execute(
            `UPDATE diagnostico SET codigo = ?, enfermedad = ? WHERE iddiagnostico = ?`,
            [codigo, enfermedad, iddiagnostico]
        );
        return result;
    },

    eliminar: async (iddiagnostico) => {
        const [result] = await db.execute(
            `DELETE FROM diagnostico WHERE iddiagnostico = ?`,
            [iddiagnostico]
        );
        return result;
    },

    mostrar: async (iddiagnostico) => {
        const [rows] = await db.execute(
            `SELECT * FROM diagnostico WHERE iddiagnostico = ?`,
            [iddiagnostico]
        );
        return rows[0];
    },

    listar: async (texto) => {
        const [rows] = await db.execute(
            `SELECT * FROM diagnostico WHERE enfermedad LIKE CONCAT('%', ?, '%') OR codigo LIKE CONCAT('%', ?, '%') ORDER BY enfermedad ASC LIMIT 0, 200`,
            [texto, texto]
        );
        return rows;
    },

    listarDiagnostico: async (texto) => {
        const [rows] = await db.execute(
            `SELECT iddiagnostico, CONCAT(codigo, '-', enfermedad) as nenfermedad FROM diagnostico WHERE enfermedad LIKE CONCAT('%', ?, '%') OR codigo LIKE CONCAT('%', ?, '%')`,
            [texto, texto]
        );
        return rows;
    },

    select: async () => {
        const [rows] = await db.execute(
            `SELECT * FROM diagnostico WHERE condicion = 1`
        );
        return rows;
    }
};

module.exports = Diagnostico;
