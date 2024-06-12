// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', require('./routes/userRoutes'));
app.use('/api/triaje', authMiddleware('triaje'), require('./routes/triajeRoutes'));
app.use('/api/servicio', authMiddleware('clinica'), require('./routes/servicioRoutes'));
app.use('/api/resultado', authMiddleware('resultado'), require('./routes/resultadoRoutes'));
app.use('/api/escritorio', authMiddleware('escritorio'), require('./routes/escritorioRoutes'));
app.use('/api/persona', authMiddleware('pacientes'), require('./controllers/personaController'));
app.use('/api/permiso', authMiddleware('clinica'), require('./controllers/permisoController'));
app.use('/api/diagnostico', authMiddleware('clinica'), require('./controllers/diagnosticoController'));
app.use('/api/consultas', authMiddleware('consultas'), require('./controllers/consultasController'));
app.use('/api/configuracion', authMiddleware('clinica'), require('./controllers/configuracionController'));
app.use('/api/atencion', authMiddleware('atencion'), require('./controllers/atencionController'));

db.getConnection()
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
