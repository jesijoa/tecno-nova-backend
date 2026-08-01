// Aquí viven las reglas de negocio: correo único, cifrado de contraseña, etc.
const bcrypt = require('bcrypt');
const clienteRepository = require('./cliente.repository');

class ClienteService {
  async getAll() {
    return clienteRepository.findAll();
  }

  async getById(id) {
    const cliente = await clienteRepository.findById(id);
    if (!cliente) {
      const error = new Error('Cliente no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return cliente;
  }

  async create(data) {
    const existente = await clienteRepository.findByCorreo(data.correo);
    if (existente) {
      const error = new Error('El correo ya está registrado');
      error.statusCode = 409;
      throw error;
    }

    const contrasenaCifrada = await bcrypt.hash(data.contrasena, 10);

    return clienteRepository.create({ ...data, contrasena: contrasenaCifrada });
  }

  async update(id, data) {
    await this.getById(id); // valida que exista

    const otro = await clienteRepository.findByCorreo(data.correo);
    if (otro && otro.id_cliente !== Number(id)) {
      const error = new Error('El correo ya está en uso por otro cliente');
      error.statusCode = 409;
      throw error;
    }

    await clienteRepository.update(id, data);
    return this.getById(id);
  }

  async updateStatus(id, estado) {
    if (typeof estado !== 'boolean') {
      const error = new Error('El estado debe ser true o false');
      error.statusCode = 400;
      throw error;
    }
    await this.getById(id);
    await clienteRepository.updateStatus(id, estado);
  }

  async delete(id) {
    await this.getById(id);
    await clienteRepository.softDelete(id);
  }
}

module.exports = new ClienteService();