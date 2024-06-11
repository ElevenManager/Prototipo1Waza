const User = require('../models/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const {
        apaterno,
        amaterno,
        nombre,
        fecha_nacimiento,
        sexo,
        estado_civil,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        ocupacion,
        cargo,
        especialidad,
        login,
        clave,
        permisos
    } = req.body;

    try {
        const clavehash = crypto.createHash('sha256').update(clave).digest('hex');
        const userData = {
            apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion, cargo, especialidad, login, clavehash, permisos
        };

        const success = await User.create(userData);
        res.json({ success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editUser = async (req, res) => {
    const {
        apaterno,
        amaterno,
        nombre,
        fecha_nacimiento,
        sexo,
        estado_civil,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        ocupacion,
        cargo,
        especialidad,
        login,
        clave,
        permisos
    } = req.body;

    const { id } = req.params;

    try {
        const clavehash = crypto.createHash('sha256').update(clave).digest('hex');
        const userData = {
            apaterno, amaterno, nombre, fecha_nacimiento, sexo, estado_civil, tipo_documento, num_documento, direccion, telefono, email, ocupacion, cargo, especialidad, login, clavehash, permisos
        };

        const success = await User.update(id, userData);
        res.json({ success });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deactivateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.deactivate(id);
        res.json({ message: 'User deactivated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.activateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.activate(id);
        res.json({ message: 'User activated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyUser = async (req, res) => {
    const { login, clave } = req.body;

    try {
        const clavehash = crypto.createHash('sha256').update(clave).digest('hex');
        const user = await User.verify(login, clavehash);

        if (!user) {
            return res.status(401).json({ message: 'Invalid login or password' });
        }

        // Obtaining user permissions
        const permisos = await User.listPermissions(user.idusuario);
        const permissions = {
            escritorio: permisos.some(p => p.idpermiso === 1),
            pacientes: permisos.some(p => p.idpermiso === 2),
            clinica: permisos.some(p => p.idpermiso === 3),
            atencion: permisos.some(p => p.idpermiso === 4),
            triaje: permisos.some(p => p.idpermiso === 5),
            resultado: permisos.some(p => p.idpermiso === 6),
            consultas: permisos.some(p => p.idpermiso === 7),
        };

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.idusuario,
                login: user.login,
                nombre: user.nombre,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                idusuario: user.idusuario,
                nombre: user.nombre,
                tipo_documento: user.tipo_documento,
                num_documento: user.num_documento,
                telefono: user.telefono,
                email: user.email,
                cargo: user.cargo,
                login: user.login,
                ...permissions,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    res.json({ message: 'Logout successful' });
};
