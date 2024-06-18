const limpiarCadena = (str) => str ? str.toString().trim() : '';

const limpiarDatos = (req, res, next) => {
    Object.keys(req.body).forEach(key => {
        req.body[key] = limpiarCadena(req.body[key]);
    });
    next();
};

module.exports = limpiarDatos;
