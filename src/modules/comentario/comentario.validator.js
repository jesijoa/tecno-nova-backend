function validateCreateComentario(req, res, next) {
  const { id_producto, calificacion, contenido } = req.body;
  if (!id_producto) {
    return res.status(400).json({ message: 'id_producto es obligatorio' });
  }
  if (!calificacion || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ message: 'calificacion debe ser un numero entre 1 y 5' });
  }
  if (!contenido || contenido.trim().length === 0) {
    return res.status(400).json({ message: 'contenido es obligatorio' });
  }
  next();
}

module.exports = { validateCreateComentario };