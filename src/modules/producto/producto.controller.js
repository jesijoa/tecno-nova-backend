// Recibe la petición HTTP, delega al service, devuelve la respuesta
const productoService = require('./producto.service');

async function getAll(req, res, next) {
  try {
    const productos = await productoService.getAll();
    res.status(200).json({ message: 'Productos retrieved successfully', data: productos });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const producto = await productoService.getById(req.params.id);
    res.status(200).json({ message: 'Producto retrieved successfully', data: producto });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const producto = await productoService.create(req.body);
    res.status(201).json({ message: 'Producto created successfully', data: producto });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const producto = await productoService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Producto updated successfully', data: producto });
  } catch (err) {
    next(err);
  }
}

async function updateStock(req, res, next) {
  try {
    await productoService.updateStock(req.params.id, req.body.stock);
    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    await productoService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ message: 'Producto status updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await productoService.delete(req.params.id);
    res.status(200).json({ message: 'Producto deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, updateStock, updateStatus, remove };