// Recibe la petición HTTP, delega al service, devuelve la respuesta
const clienteService = require('./cliente.service');

async function getAll(req, res, next) {
  try {
    const clientes = await clienteService.getAll();
    res.status(200).json({ message: 'Clientes retrieved successfully', data: clientes });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const cliente = await clienteService.getById(req.params.id);
    res.status(200).json({ message: 'Cliente retrieved successfully', data: cliente });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const cliente = await clienteService.create(req.body);
    res.status(201).json({ message: 'Cliente created successfully', data: cliente });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const cliente = await clienteService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Cliente updated successfully', data: cliente });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    await clienteService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ message: 'Cliente status updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await clienteService.delete(req.params.id);
    res.status(200).json({ message: 'Cliente deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, updateStatus, remove };