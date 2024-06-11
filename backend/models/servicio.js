const db = require('../config/db');

module.exports = {
    insertar: async (nombre, costo, categoria) => {
        const [result] = await db.execute(
            'INSERT INTO servicio (nombre, costo, condicion, categoria) VALUES (?, ?, 1, ?)',
            [nombre, costo, categoria]
        );
        return result;
    },
    editar: async (idservicio, nombre, costo, categoria) => {
        const [result] = await db.execute(
            'UPDATE servicio SET nombre = ?, costo = ?, categoria = ? WHERE idservicio = ?',
            [nombre, costo, categoria, idservicio]
        );
        return result;
    },
    desactivar: async (idservicio) => {
        const [result] = await db.execute(
            'UPDATE servicio SET condicion = 0 WHERE idservicio = ?',
            [idservicio]
        );
        return result;
    },
    activar: async (idservicio) => {
        const [result] = await db.execute(
            'UPDATE servicio SET condicion = 1 WHERE idservicio = ?',
            [idservicio]
        );
        return result;
    },
    mostrar: async (idservicio) => {
        const [result] = await db.execute(
            'SELECT * FROM servicio WHERE idservicio = ?',
            [idservicio]
        );
        return result[0];
    },
    listar: async () => {
        const [result] = await db.execute('SELECT * FROM servicio');
        return result;
    }
};
