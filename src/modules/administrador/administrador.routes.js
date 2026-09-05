const express = require('express');
const router = express.Router();
const controller = require('./administrador.controller');
const { validateCreate, validateLogin } = require('./administrador.validator');
const verifyAdmin = require('../../middleware/verifyAdmin');

router.post('/', validateCreate, controller.create);
router.post('/login', validateLogin, controller.login);
router.get('/', verifyAdmin, controller.getAll);
router.patch('/:id/estado', verifyAdmin, controller.updateEstado);

module.exports = router;