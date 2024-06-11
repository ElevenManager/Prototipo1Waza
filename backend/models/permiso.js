const db = require('../config/db');

const Permiso = {
    listar: async () => {
        const [rows] = await db.execute(`SELECT * FROM permiso`);
        return rows;
    }
};

module.exports = Permiso;
