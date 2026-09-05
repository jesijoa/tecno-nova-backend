const express = require('express');
const router = express.Router();
const controller = require('./servicioTecnico.controller');
const { validateCreate } = require('./servicioTecnico.validator');
const verifyToken = require('../../middleware/verifyToken');
const verifyAdmin = require('../../middleware/verifyAdmin');

router.post('/', verifyToken, validateCreate, controller.create);
router.get('/mis-solicitudes', verifyToken, controller.getMisSolicitudes);
router.get('/', verifyAdmin, controller.getAll);
router.patch('/:id/asignar', verifyAdmin, controller.asignar);
router.patch('/:id/resolver', verifyAdmin, controller.resolver);

module.exports = router;