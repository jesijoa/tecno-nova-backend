const pool = require('../../config/db');

class AdministradorRepository {
  async findByUsuario(usuario) {
    const [rows] = await pool.query(
      'SELECT * FROM administrador WHERE usuario = ? AND deleted_at IS NULL',
      [usuario]
    );
    return rows[0];
  }

  async create({ usuario, contrasena, nombre, rol }) {
    const [result] = await pool.query(
      'INSERT INTO administrador (usuario, contrasena, nombre, rol) VALUES (?, ?, ?, ?)',
      [usuario, contrasena, nombre, rol || 'administrador']
    );
    return { id_administrador: result.insertId, usuario, nombre, rol: rol || 'administrador' };
  }

  async findAll() {
    const [rows] = await pool.query(
      'SELECT id_administrador, usuario, nombre, rol, estado FROM administrador WHERE deleted_at IS NULL'
    );
    return rows;
  }

  async findById(id_administrador) {
    const [rows] = await pool.query(
      'SELECT id_administrador, usuario, nombre, rol, estado FROM administrador WHERE id_administrador = ? AND deleted_at IS NULL',
      [id_administrador]
    );
    return rows[0];
  }

  async updateEstado(id_administrador, estado) {
    await pool.query('UPDATE administrador SET estado = ? WHERE id_administrador = ?', [estado, id_administrador]);
  }
}

module.exports = new AdministradorRepository();