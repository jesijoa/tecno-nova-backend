const comentarioService = require('./comentario.service');

async function create(req, res, next) {
  try {
    const { id_producto, calificacion, contenido } = req.body;
    const comentario = await comentarioService.crear(req.cliente.id_cliente, id_producto, calificacion, contenido);
    res.status(201).json({ message: 'Comentario agregado', data: comentario });
  } catch (err) {
    next(err);
  }
}

async function getByProducto(req, res, next) {
  try {
    const resultado = await comentarioService.listarPorProducto(req.params.id_producto);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await comentarioService.eliminar(req.cliente.id_cliente, req.params.id);
    res.status(200).json({ message: 'Comentario eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getByProducto, remove };