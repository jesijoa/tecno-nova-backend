const express = require('express');
const router = express.Router();
const controller = require('./producto.controller');
const { validateCreateProducto, validateUpdateProducto } = require('./producto.validator');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);
router.post('/', verifyToken, validateCreateProducto, controller.create);
router.put('/:id', verifyToken, validateUpdateProducto, controller.update);
router.patch('/:id/stock', verifyToken, controller.updateStock);
router.patch('/:id/status', verifyToken, controller.updateStatus);
router.delete('/:id', verifyToken, controller.remove);

module.exports = router;