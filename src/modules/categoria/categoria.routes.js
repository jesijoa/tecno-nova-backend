const express = require('express');
const router = express.Router();
const controller = require('./categoria.controller');
const { validateCreate, validateUpdate } = require('./categoria.validator');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);
router.post('/', verifyToken, validateCreate, controller.create);
router.put('/:id', verifyToken, validateUpdate, controller.update);
router.patch('/:id/status', verifyToken, controller.updateStatus);
router.delete('/:id', verifyToken, controller.remove);

module.exports = router;