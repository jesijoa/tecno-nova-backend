// Recibe la petición de login, delega al service, devuelve la respuesta
const authService = require('./auth.service');

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body;
    const resultado = await authService.login(correo, contrasena);
    res.status(200).json({ message: 'Login successful', data: resultado });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };