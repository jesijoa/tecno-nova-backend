const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const administradorRepository = require('./administrador.repository');

class AdministradorService {
  async crear(usuario, contrasena, nombre, rol) {
    const existente = await administradorRepository.findByUsuario(usuario);
    if (existente) {
      const error = new Error('Ese usuario ya existe');
      error.statusCode = 409;
      throw error;
    }
    const contrasenaCifrada = await bcrypt.hash(contrasena, 10);
    return administradorRepository.create({ usuario, contrasena: contrasenaCifrada, nombre, rol });
  }

  async login(usuario, contrasena) {
    const admin = await administradorRepository.findByUsuario(usuario);
    if (!admin) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }
    const passwordOk = await bcrypt.compare(contrasena, admin.contrasena);
    if (!passwordOk) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { id_administrador: admin.id_administrador, usuario: admin.usuario, rol: admin.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    return { token, administrador: { id_administrador: admin.id_administrador, nombre: admin.nombre, rol: admin.rol } };
  }

  async listar() {
    return administradorRepository.findAll();
  }

  async cambiarEstado(id_administrador, estado) {
    const admin = await administradorRepository.findById(id_administrador);
    if (!admin) {
      const error = new Error('Administrador no encontrado');
      error.statusCode = 404;
      throw error;
    }
    await administradorRepository.updateEstado(id_administrador, estado);
    return administradorRepository.findById(id_administrador);
  }
}

module.exports = new AdministradorService();