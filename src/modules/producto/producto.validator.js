// Valida el formato y la obligatoriedad de los campos del Producto
function validateCreateProducto(req, res, next) {
  const { nombre_producto, descripcion, precio, stock } = req.body || {};

  if (!nombre_producto || !descripcion || precio === undefined || stock === undefined) {
    const error = new Error('Nombre, descripcion, precio y stock son obligatorios');
    error.statusCode = 400;
    return next(error);
  }

  if (isNaN(precio) || Number(precio) <= 0) {
    const error = new Error('El precio debe ser un numero mayor a 0');
    error.statusCode = 400;
    return next(error);
  }

  if (isNaN(stock) || Number(stock) < 0) {
    const error = new Error('El stock debe ser un numero mayor o igual a 0');
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

function validateUpdateProducto(req, res, next) {
  const { nombre_producto, descripcion, precio } = req.body || {};

  if (!nombre_producto || !descripcion || precio === undefined) {
    const error = new Error('Nombre, descripcion y precio son obligatorios');
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

module.exports = { validateCreateProducto, validateUpdateProducto };