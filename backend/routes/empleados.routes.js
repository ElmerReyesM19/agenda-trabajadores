const express = require('express');
const router = express.Router();
const controlador = require('../controllers/EmpleadoController');

router.get('/', controlador.obtenerTodos);
router.post('/', controlador.crear);

module.exports = router;
