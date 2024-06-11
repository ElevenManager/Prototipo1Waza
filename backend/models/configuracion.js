const db = require('../config/db');

const Configuracion = {
    insertar: async (razon_social, ruc, email, telefono, direccion, responsable) => {
        const [result] = await db.execute(
            `INSERT INTO configuracion (razon_social, ruc, email, telefono, direccion, responsable) 
      VALUES (?, ?, ?, ?, ?, ?)`,
            [razon_social, ruc, email, telefono, direccion, responsable]
        );
        return result;
    },

    editar: async (idconfiguracion, razon_social, ruc, email, telefono, direccion, responsable) => {
        const [result] = await db.execute(
            `UPDATE configuracion SET razon_social = ?, ruc = ?, email = ?, telefono = ?, direccion = ?, responsable = ? 
      WHERE idconfiguracion = ?`,
            [razon_social, ruc, email, telefono, direccion, responsable, idconfiguracion]
        );
        return result;
    },

    mostrar: async (idconfiguracion) => {
        const [rows] = await db.execute(
            `SELECT * FROM configuracion WHERE idconfiguracion = ?`,
            [idconfiguracion]
        );
        return rows[0];
    },

    listar: async () => {
        const [rows] = await db.execute(`SELECT * FROM configuracion`);
        return rows;
    },

    select: async () => {
        const [rows] = await db.execute(`SELECT * FROM configuracion WHERE condicion = 1`);
        return rows;
    }
};

module.exports = Configuracion;
