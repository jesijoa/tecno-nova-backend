const express = require('express');
const router = express.Router();
const controller = require('./cliente.controller');
const { validateCreateCliente, validateUpdateCliente } = require('./cliente.validator');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateCreateCliente, controller.create);
router.put('/:id', validateUpdateCliente, controller.update);
router.patch('/:id/status', controller.updateStatus);
router.delete('/:id', controller.remove);

module.exports = router;