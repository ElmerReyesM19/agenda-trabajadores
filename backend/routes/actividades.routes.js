const express = require('express');
const router = express.Router();
const controlador = require('../controllers/ActividadController');

router.post('/', controlador.crearActividad);

router.get('/', controlador.obtenerTodas);
router.get('/por-fecha', controlador.obtenerPorFecha);
router.post('/', controlador.crearActividad);
router.put('/:id/estado', controlador.actualizarEstado);

module.exports = router;
