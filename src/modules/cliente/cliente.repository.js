// Única capa que habla directamente con la base de datos
const pool = require('../../config/db');

class ClienteRepository {
  async findAll() {
    const [rows] = await pool.query(
      'SELECT id_cliente, usuario, nombre, correo, telefono, direccion, estado FROM Cliente WHERE deleted_at IS NULL'
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id_cliente, usuario, nombre, correo, telefono, direccion, estado FROM Cliente WHERE id_cliente = ? AND deleted_at IS NULL',
      [id]
    );
    return rows[0];
  }

  async findByCorreo(correo) {
    const [rows] = await pool.query('SELECT * FROM Cliente WHERE correo = ?', [correo]);
    return rows[0];
  }

  async create(cliente) {
    const { usuario, contrasena, nombre, correo, telefono, direccion } = cliente;
    const [result] = await pool.query(
      'INSERT INTO Cliente (usuario, contrasena, nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)',
      [usuario, contrasena, nombre, correo, telefono || null, direccion || null]
    );
    return { id_cliente: result.insertId, usuario, nombre, correo, telefono, direccion };
  }

  async update(id, cliente) {
    const { nombre, correo, telefono, direccion } = cliente;
    await pool.query(
      'UPDATE Cliente SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?',
      [nombre, correo, telefono || null, direccion || null, id]
    );
  }

  async updateStatus(id, estado) {
    await pool.query('UPDATE Cliente SET estado = ? WHERE id_cliente = ?', [estado, id]);
  }

  async softDelete(id) {
    await pool.query('UPDATE Cliente SET estado = false, deleted_at = NOW() WHERE id_cliente = ?', [id]);
  }
}

module.exports = new ClienteRepository();