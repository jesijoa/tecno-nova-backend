// Valida el formato y la obligatoriedad de los campos del Cliente
function validateCreateCliente(req, res, next) {
  const { usuario, contrasena, nombre, correo } = req.body || {};

  if (!usuario || !contrasena || !nombre || !correo) {
    const error = new Error('Usuario, contraseña, nombre y correo son obligatorios');
    error.statusCode = 400;
    return next(error);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    const error = new Error('El formato del correo no es válido');
    error.statusCode = 400;
    return next(error);
  }

  if (contrasena.length < 6) {
    const error = new Error('La contraseña debe tener al menos 6 caracteres');
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

function validateUpdateCliente(req, res, next) {
  const { nombre, correo } = req.body || {};

  if (!nombre || !correo) {
    const error = new Error('Nombre y correo son obligatorios');
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

module.exports = { validateCreateCliente, validateUpdateCliente };