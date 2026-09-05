function validateAddItem(req, res, next) {
  const { id_producto, cantidad } = req.body;
  if (!id_producto) {
    return res.status(400).json({ message: 'id_producto es obligatorio' });
  }
  if (!cantidad || cantidad <= 0) {
    return res.status(400).json({ message: 'cantidad debe ser mayor a 0' });
  }
  next();
}

function validateUpdateItem(req, res, next) {
  const { cantidad } = req.body;
  if (!cantidad || cantidad <= 0) {
    return res.status(400).json({ message: 'cantidad debe ser mayor a 0' });
  }
  next();
}

module.exports = { validateAddItem, validateUpdateItem };