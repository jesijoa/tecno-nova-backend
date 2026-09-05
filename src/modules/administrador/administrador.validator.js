function validateCreate(req, res, next) {
  const { usuario, contrasena, nombre } = req.body;
  if (!usuario || !contrasena || !nombre) {
    return res.status(400).json({ message: 'usuario, contrasena y nombre son obligatorios' });
  }
  next();
}

function validateLogin(req, res, next) {
  const { usuario, contrasena } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'usuario y contrasena son obligatorios' });
  }
  next();
}

module.exports = { validateCreate, validateLogin };