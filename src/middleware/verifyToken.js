// Revisa que la petición traiga un token JWT válido antes de continuar
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    const error = new Error('No se envió un token de autenticación');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error('Token inválido o expirado');
      error.statusCode = 403;
      return next(error);
    }
    req.cliente = decoded;
    next();
  });
}

module.exports = verifyToken;