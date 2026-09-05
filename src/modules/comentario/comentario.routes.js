const express = require('express');
const router = express.Router();
const controller = require('./comentario.controller');
const { validateCreateComentario } = require('./comentario.validator');
const verifyToken = require('../../middleware/verifyToken');

router.post('/', verifyToken, validateCreateComentario, controller.create);
router.get('/producto/:id_producto', controller.getByProducto);
router.delete('/:id', verifyToken, controller.remove);

module.exports = router;