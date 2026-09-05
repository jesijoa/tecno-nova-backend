const express = require('express');
const router = express.Router();
const controller = require('./carrito.controller');
const { validateAddItem, validateUpdateItem } = require('./carrito.validator');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, controller.getCarrito);
router.post('/items', verifyToken, validateAddItem, controller.addItem);
router.put('/items/:id', verifyToken, validateUpdateItem, controller.updateItem);
router.delete('/items/:id', verifyToken, controller.removeItem);
router.delete('/', verifyToken, controller.clear);

module.exports = router;