module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Empleado.associate = (models) => {
    Empleado.belongsToMany(models.Actividad, {
      through: 'ActividadEmpleado',
      as: 'actividades', 
      foreignKey: 'empleadoId'
    });
  };

  return Empleado;
};
