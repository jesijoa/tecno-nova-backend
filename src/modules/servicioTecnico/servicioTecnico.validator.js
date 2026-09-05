function validateCreate(req, res, next) {
  const { id_producto, descripcion } = req.body;
  if (!id_producto) {
    return res.status(400).json({ message: 'id_producto es obligatorio' });
  }
  if (!descripcion || descripcion.trim().length === 0) {
    return res.status(400).json({ message: 'descripcion es obligatoria' });
  }
  next();
}

module.exports = { validateCreate };