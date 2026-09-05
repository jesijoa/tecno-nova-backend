const express = require('express');
const router = express.Router();
const controller = require('./factura.controller');
const { validateCreateFactura } = require('./factura.validator');
const verifyToken = require('../../middleware/verifyToken');

router.post('/', verifyToken, validateCreateFactura, controller.create);
router.get('/:id', verifyToken, controller.getById);

module.exports = router;