const pagoService = require('./pago.service');

async function create(req, res, next) {
  try {
    const { id_pedido, metodo_pago } = req.body;
    const pago = await pagoService.registrarPago(req.cliente.id_cliente, id_pedido, metodo_pago);
    res.status(201).json({ message: 'Pago registrado', data: pago });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const pago = await pagoService.obtener(req.params.id);
    res.status(200).json(pago);
  } catch (err) {
    next(err);
  }
}

async function updateEstado(req, res, next) {
  try {
    const pago = await pagoService.actualizarEstado(req.params.id, req.body.estado);
    res.status(200).json({ message: 'Estado del pago actualizado', data: pago });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getById, updateEstado };