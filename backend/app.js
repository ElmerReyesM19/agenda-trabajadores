require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const insertarEmpleados = require('./seeders/empleados.seed');

const trabajadoresRoutes = require('./routes/empleados.routes');
const actividadesRoutes = require('./routes/actividades.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/trabajadores', trabajadoresRoutes);
app.use('/api/actividades', actividadesRoutes);

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');

    await sequelize.sync({ alter: true });

    // Solo insertar datos si no es entorno de test
    if (process.env.NODE_ENV !== 'test') {
      await insertarEmpleados();
    }

    // Solo levantar servidor si no está en modo test
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`);
      });
    }
  } catch (err) {
    console.error('Error al inicializar el servidor:', err);
  }
}

// Ejecutar solo si no es entorno de test
if (process.env.NODE_ENV !== 'test') {
  iniciar();
}

module.exports = app; // Necesario para los tests
  