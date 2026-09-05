const administradorService = require('./administrador.service');

async function create(req, res, next) {
  try {
    const { usuario, contrasena, nombre, rol } = req.body;
    const admin = await administradorService.crear(usuario, contrasena, nombre, rol);
    res.status(201).json({ message: 'Administrador creado', data: admin });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { usuario, contrasena } = req.body;
    const resultado = await administradorService.login(usuario, contrasena);
    res.status(200).json({ message: 'Login exitoso', data: resultado });
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const admins = await administradorService.listar();
    res.status(200).json({ message: 'Administradores obtenidos', data: admins });
  } catch (err) {
    next(err);
  }
}

async function updateEstado(req, res, next) {
  try {
    const admin = await administradorService.cambiarEstado(req.params.id, req.body.estado);
    res.status(200).json({ message: 'Estado actualizado', data: admin });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, login, getAll, updateEstado };