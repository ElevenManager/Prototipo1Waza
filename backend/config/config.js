require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_ENCODE: process.env.DB_ENCODE,
    PRO_NOMBRE: process.env.PRO_NOMBRE
};
