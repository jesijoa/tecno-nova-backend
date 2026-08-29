// Valida que lleguen correo y contraseña antes de intentar el login
function validateLogin(req, res, next) {
  const { correo, contrasena } = req.body || {};

  if (!correo || !contrasena) {
    const error = new Error('Correo y contraseña son obligatorios');
    error.statusCode = 400;
    return next(error);
  }

  return next();
}

module.exports = { validateLogin };