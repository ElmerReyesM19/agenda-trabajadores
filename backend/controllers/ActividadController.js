const { Actividad, Empleado, sequelize } = require('../models');

// Crear actividad con empleados existentes y nuevos
async function crearActividad(req, res) {
  const { fecha, descripcion, lugar, empleadoIds = [], nuevosEmpleados = [] } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const actividad = await Actividad.create({ fecha, descripcion, lugar }, { transaction });

    // Asociar empleados existentes
    if (empleadoIds.length > 0) {
      const empleadosExistentes = await Empleado.findAll({
        where: { id: empleadoIds },
      });
      await actividad.addEmpleados(empleadosExistentes, { transaction });
    }

    // Crear nuevos empleados y asociarlos
    for (const nombre of nuevosEmpleados) {
      const nuevoEmp = await Empleado.create({ nombre }, { transaction });
      await actividad.addEmpleado(nuevoEmp, { transaction });
    }

    await transaction.commit();
    return res.status(201).json({ success: true, actividad });
  } catch (error) {
    await transaction.rollback();
    console.error('Error crearActividad:', error);
    return res.status(500).json({ success: false, message: 'Error al crear actividad' });
  }
}

// Obtener todas las actividades con empleados
async function obtenerTodas(req, res) {
  try {
    const actividades = await Actividad.findAll({
      include: {
        model: Empleado,
        as: 'empleados',
      },
    });
    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
}

//  Obtener actividades por fecha con empleados
async function obtenerPorFecha(req, res) {
  try {
    const { fecha } = req.query;
    const actividades = await Actividad.findAll({
      where: { fecha },
      include: {
        model: Empleado,
        as: 'empleados',
      },
    });
    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades por fecha:', error);
    res.status(500).json({ error: 'Error al obtener actividades por fecha' });
  }
}

async function actualizarEstado(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    actividad.estado = estado;
    await actividad.save();

    res.json({ success: true, actividad });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
}

module.exports = {
  crearActividad,
  obtenerTodas,
  obtenerPorFecha,
  actualizarEstado,
};
