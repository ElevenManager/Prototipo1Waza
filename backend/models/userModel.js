const db = require('../config/db');

const User = {
    create: async (userData) => {
        const { apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion, cargo, especialidad, login, clavehash, permisos } = userData;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const [personaResult] = await connection.execute(
                'INSERT INTO persona (apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion]
            );

            const idpersona = personaResult.insertId;

            const [userResult] = await connection.execute(
                'INSERT INTO usuario (idusuario, cargo, especialidad, login, clave, condicion) VALUES (?, ?, ?, ?, ?, 1)',
                [idpersona, cargo, especialidad, login, clavehash]
            );

            const num_elementos = permisos.length;
            let sw = true;

            for (let i = 0; i < num_elementos; i++) {
                const [permisoResult] = await connection.execute(
                    'INSERT INTO usuario_permiso (idusuario, idpermiso) VALUES (?, ?)',
                    [idpersona, permisos[i]]
                );

                if (!permisoResult.affectedRows) {
                    sw = false;
                    break;
                }
            }

            await connection.commit();
            return sw;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    update: async (idpersona, userData) => {
        const { apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion, cargo, especialidad, login, clavehash, permisos } = userData;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            await connection.execute(
                'UPDATE persona SET apaterno = ?, amaterno = ?, nombre = ?, fecha_nacimiento = ?, sexo = ?, estado_civil = ?, tipo_documento = ?, num_documento = ?, direccion = ?, telefono = ?, email = ?, ocupacion = ? WHERE idpersona = ?',
                [apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion, idpersona]
            );

            await connection.execute(
                'UPDATE usuario SET cargo = ?, especialidad = ?, login = ?, clave = ? WHERE idusuario = ?',
                [cargo, especialidad, login, clavehash, idpersona]
            );

            await connection.execute(
                'DELETE FROM usuario_permiso WHERE idusuario = ?',
                [idpersona]
            );

            const num_elementos = permisos.length;
            let sw = true;

            for (let i = 0; i < num_elementos; i++) {
                const [permisoResult] = await connection.execute(
                    'INSERT INTO usuario_permiso (idusuario, idpermiso) VALUES (?, ?)',
                    [idpersona, permisos[i]]
                );

                if (!permisoResult.affectedRows) {
                    sw = false;
                    break;
                }
            }

            await connection.commit();
            return sw;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    deactivate: async (idusuario) => {
        await db.execute(
            'UPDATE usuario SET condicion = 0 WHERE idusuario = ?',
            [idusuario]
        );
    },

    activate: async (idusuario) => {
        await db.execute(
            'UPDATE usuario SET condicion = 1 WHERE idusuario = ?',
            [idusuario]
        );
    },

    findById: async (idusuario) => {
        const [rows] = await db.execute(
            'SELECT u.idusuario, u.cargo, u.especialidad, u.login, u.condicion, p.apaterno, p.amaterno, p.nombre, p.fecha_nacimiento, p.sexo, p.estado_civil, p.tipo_documento, p.num_documento, p.direccion, p.telefono, p.email, p.ocupacion FROM usuario u INNER JOIN persona p ON u.idusuario = p.idpersona WHERE u.idusuario = ?',
            [idusuario]
        );

        return rows[0];
    },

    findAll: async () => {
        const [rows] = await db.execute(
            'SELECT u.idusuario, u.cargo, u.especialidad, u.login, u.condicion, p.apaterno, p.amaterno, p.nombre, p.fecha_nacimiento, p.sexo, p.estado_civil, p.tipo_documento, p.num_documento, p.direccion, p.telefono, p.email, p.ocupacion FROM usuario u INNER JOIN persona p ON u.idusuario = p.idpersona'
        );

        return rows;
    },

    listPermissions: async (idusuario) => {
        const [rows] = await db.execute(
            'SELECT * FROM usuario_permiso WHERE idusuario = ?',
            [idusuario]
        );

        return rows;
    },

    verify: async (login, clave) => {
        const [rows] = await db.execute(
            'SELECT u.idusuario, p.nombre, p.tipo_documento, p.num_documento, p.telefono, p.email, u.cargo, u.login FROM usuario u INNER JOIN persona p ON u.idusuario = p.idpersona WHERE u.login = ? AND u.clave = ? AND u.condicion = 1',
            [login, clave]
        );

        return rows[0];
    }
};

module.exports = User;
