const categoriaService = require('./categoria.service');

async function getAll(req, res, next) {
  try {
    const categorias = await categoriaService.listar();
    res.status(200).json(categorias);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const categoria = await categoriaService.obtener(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const nueva = await categoriaService.crear(req.body);
    res.status(201).json({ message: 'Categoría creada', data: nueva });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    await categoriaService.actualizar(req.params.id, req.body);
    res.status(200).json({ message: 'Categoría actualizada' });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    await categoriaService.cambiarEstado(req.params.id, req.body.estado);
    res.status(200).json({ message: 'Estado actualizado' });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await categoriaService.eliminar(req.params.id);
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, updateStatus, remove };