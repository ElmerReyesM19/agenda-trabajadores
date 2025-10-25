module.exports = (sequelize, DataTypes) => {
  const Actividad = sequelize.define('Actividad', {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lugar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Actividad.associate = (models) => {
    Actividad.belongsToMany(models.Empleado, {
      through: 'ActividadEmpleado',
      as: 'empleados', 
      foreignKey: 'actividadId'
    });
  };

  return Actividad;
};
