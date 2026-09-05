function validateCreateFactura(req, res, next) {
  const { id_pedido } = req.body;
  if (!id_pedido) {
    return res.status(400).json({ message: 'id_pedido es obligatorio' });
  }
  next();
}

module.exports = { validateCreateFactura };