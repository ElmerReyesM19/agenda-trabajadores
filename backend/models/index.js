const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Empleado = require('./Empleado')(sequelize, Sequelize.DataTypes);
const Actividad = require('./Actividad')(sequelize, Sequelize.DataTypes);

// Asociaciones
Empleado.associate({ Actividad });
Actividad.associate({ Empleado });

module.exports = {
  sequelize,
  Empleado,
  Actividad
};
