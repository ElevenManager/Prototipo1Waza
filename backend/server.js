const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', require('./routes/userRoutes'));
app.use('/api/triaje', require('./routes/triajeRoutes'));
app.use('/api/servicio', require('./routes/servicioRoutes'));
app.use('/api/servicio', require('./routes/servicioRoutes'));
app.use('/api/resultado', require('./routes/resultadoRoutes'));

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
