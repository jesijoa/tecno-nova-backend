const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    const error = new Error('No se envió un token de autenticación');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.id_administrador) {
      const error = new Error('Token inválido o no pertenece a un administrador');
      error.statusCode = 403;
      return next(error);
    }
    req.administrador = decoded;
    next();
  });
}

module.exports = verifyAdmin;