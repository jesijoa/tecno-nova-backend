// Verifica las credenciales y genera el token de acceso
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const clienteRepository = require('../cliente/cliente.repository');

class AuthService {
  async login(correo, contrasena) {
    const cliente = await clienteRepository.findByCorreo(correo);
    if (!cliente) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }

    const passwordOk = await bcrypt.compare(contrasena, cliente.Contrasena);
    if (!passwordOk) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id_cliente: cliente.id_cliente, correo: cliente.Correo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return { token, cliente: { id_cliente: cliente.id_cliente, nombre: cliente.Nombre, correo: cliente.Correo } };
  }
}

module.exports = new AuthService();