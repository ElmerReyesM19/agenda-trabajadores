const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ActividadEmpleado = sequelize.define('ActividadEmpleado', {
  actividadId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'actividades',
      key: 'id'
    }
  },
  empleadoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'empleados',
      key: 'id'
    }
  }
}, {
  tableName: 'actividad_empleados',
  timestamps: false
});

module.exports = ActividadEmpleado;
