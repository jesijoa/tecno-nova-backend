const pedidoService = require('./pedido.service');

async function create(req, res, next) {
  try {
    const { id_cliente, items } = req.body;
    const resultado = await pedidoService.crearPedido(id_cliente, items);
    res.status(201).json({ message: 'Pedido creado', data: resultado });
  } catch (err) { next(err); }
}

async function getAll(req, res, next) {
  try { res.status(200).json(await pedidoService.listar()); } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try { res.status(200).json(await pedidoService.obtener(req.params.id)); } catch (err) { next(err); }
}

async function getByCliente(req, res, next) {
  try { res.status(200).json(await pedidoService.listarPorCliente(req.params.id_cliente)); } catch (err) { next(err); }
}

async function updateStatus(req, res, next) {
  try {
    await pedidoService.cambiarEstado(req.params.id, req.body.estado);
    res.status(200).json({ message: 'Estado actualizado' });
  } catch (err) { next(err); }
}

module.exports = { create, getAll, getById, getByCliente, updateStatus };