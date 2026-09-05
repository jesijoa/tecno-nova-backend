const facturaService = require('./factura.service');

async function create(req, res, next) {
  try {
    const { id_pedido } = req.body;
    const factura = await facturaService.generar(req.cliente.id_cliente, id_pedido);
    res.status(201).json({ message: 'Factura generada', data: factura });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const factura = await facturaService.obtener(req.params.id);
    res.status(200).json(factura);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getById };