function validateCreatePedido(req, res, next) {
  const { id_cliente, items } = req.body;
  if (!id_cliente) return res.status(400).json({ message: 'id_cliente es obligatorio' });
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'items debe ser una lista con al menos un producto' });
  }
  for (const item of items) {
    if (!item.id_producto || !item.cantidad || item.cantidad <= 0) {
      return res.status(400).json({ message: 'Cada item necesita id_producto y cantidad válida' });
    }
  }
  next();
}

module.exports = { validateCreatePedido };