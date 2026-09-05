const express = require('express');
const router = express.Router();
const controller = require('./pago.controller');
const { validateCreatePago, validateUpdateEstado } = require('./pago.validator');
const verifyToken = require('../../middleware/verifyToken');

router.post('/', verifyToken, validateCreatePago, controller.create);
router.get('/:id', verifyToken, controller.getById);
router.patch('/:id/estado', verifyToken, controller.updateEstado);

module.exports = router;