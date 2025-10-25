const { Empleado } = require('../models');

const empleadosIniciales = [
  'ANTONY RAMIREZ',
  'OSLEN DELEON',
  'ROBER MAZARIEGOS',
  'LUIS ABARCA',
  'LUIS HIGINIO MIGUEL',
  'DENISE DELEON',
  'JORGE HERNANDEZ',
  'EDGAR MIGUEL',
  'SILVIA ALVARADO',
  'WILMAR RODRIGUEZ',
  'SELVIN ALVARADO',
  'RAMIRO ALVARADO',
  'MELVIN CHOC',
  'CRISTIAN CACAMO',
  'FRANCISCO CIFUENTES',
  'BRAYAN SANCHEZ',
  'CARLOS CHUB CHOO',
  'FAUSTO ARIZMENDI',
  'ELIESAR REINA',
  'MANUEL DE JESUS',
  'SAMUEL HERNANDEZ',
  'JOSE MANUEL LOAEZA',
  'IZABELLA HERRERA',
  'ELMER REYES',
  'GERMAN IGLESIAS',
  'NOE CHE CHO',
  'MARIO FLORES',
  'MARIO FLORES JR',
  'PABLO MARTINEZ',
  'MARVIN ALVARADO',
  'HECTOR CRUZ',
  'ELMER MAZARIEGOS',
  'STACEY HOGAN',
  'EARL'
];

async function insertarEmpleados() {
  try {
    for (const nombre of empleadosIniciales) {
      const existe = await Empleado.findOne({ where: { nombre } });

      if (!existe) {
        await Empleado.create({ nombre });
        console.log(`Empleado agregado: ${nombre}`);
      } else {
        console.log(`Empleado ya existe: ${nombre}`);
      }
    }
  } catch (error) {
    console.error('Error insertando empleados:', error);
    throw error;
  }
}

module.exports = insertarEmpleados;
