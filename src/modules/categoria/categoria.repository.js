const pool = require('../../config/db');

class CategoriaRepository {
  async findAll() {
    const [rows] = await pool.query(
      'SELECT id_categoria, nombre_categoria, descripcion, estado FROM Categoria WHERE deleted_at IS NULL'
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id_categoria, nombre_categoria, descripcion, estado FROM Categoria WHERE id_categoria = ? AND deleted_at IS NULL',
      [id]
    );
    return rows[0];
  }

  async create({ nombre_categoria, descripcion }) {
    const [result] = await pool.query(
      'INSERT INTO Categoria (nombre_categoria, descripcion) VALUES (?, ?)',
      [nombre_categoria, descripcion || null]
    );
    return { id_categoria: result.insertId, nombre_categoria, descripcion };
  }

  async update(id, { nombre_categoria, descripcion }) {
    await pool.query(
      'UPDATE Categoria SET nombre_categoria = ?, descripcion = ? WHERE id_categoria = ?',
      [nombre_categoria, descripcion, id]
    );
  }

  async updateStatus(id, estado) {
    await pool.query('UPDATE Categoria SET estado = ? WHERE id_categoria = ?', [estado, id]);
  }

  async softDelete(id) {
    await pool.query('UPDATE Categoria SET estado = false, deleted_at = NOW() WHERE id_categoria = ?', [id]);
  }
}

module.exports = new CategoriaRepository();