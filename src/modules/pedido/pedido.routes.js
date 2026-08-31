const express = require('express');
const router = express.Router();
const controller = require('./pedido.controller');
const { validateCreatePedido } = require('./pedido.validator');
const verifyToken = require('../../middleware/verifyToken');

router.post('/', verifyToken, validateCreatePedido, controller.create);
router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);
router.get('/cliente/:id_cliente', verifyToken, controller.getByCliente);
router.patch('/:id/status', verifyToken, controller.updateStatus);

module.exports = router;