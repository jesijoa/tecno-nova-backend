const express = require('express');
const router = express.Router();
const controller = require('./producto.controller');
const { validateCreateProducto, validateUpdateProducto } = require('./producto.validator');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateCreateProducto, controller.create);
router.put('/:id', validateUpdateProducto, controller.update);
router.patch('/:id/stock', controller.updateStock);
router.patch('/:id/status', controller.updateStatus);
router.delete('/:id', controller.remove);

module.exports = router;