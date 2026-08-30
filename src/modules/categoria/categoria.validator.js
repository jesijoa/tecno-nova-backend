function validateCreate(req, res, next) {
  const { nombre_categoria } = req.body;
  if (!nombre_categoria || nombre_categoria.trim() === '') {
    return res.status(400).json({ message: 'nombre_categoria es obligatorio' });
  }
  next();
}

function validateUpdate(req, res, next) {
  const { nombre_categoria } = req.body;
  if (!nombre_categoria || nombre_categoria.trim() === '') {
    return res.status(400).json({ message: 'nombre_categoria es obligatorio' });
  }
  next();
}

module.exports = { validateCreate, validateUpdate };