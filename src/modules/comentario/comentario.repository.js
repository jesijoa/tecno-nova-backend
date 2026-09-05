const pool = require('../../config/db');

class ComentarioRepository {
  async create(id_cliente, id_producto, calificacion, contenido) {
    const [result] = await pool.query(
      'INSERT INTO comentario (id_cliente, id_producto, calificacion, contenido) VALUES (?, ?, ?, ?)',
      [id_cliente, id_producto, calificacion, contenido]
    );
    return { id_comentario: result.insertId, id_cliente, id_producto, calificacion, contenido };
  }

  async findByProducto(id_producto) {
    const [rows] = await pool.query(
      `SELECT c.id_comentario, c.id_cliente, cl.nombre AS nombre_cliente, c.calificacion, c.contenido, c.fecha_comentario
       FROM comentario c
       JOIN cliente cl ON cl.id_cliente = c.id_cliente
       WHERE c.id_producto = ?
       ORDER BY c.fecha_comentario DESC`,
      [id_producto]
    );
    return rows;
  }

  async findPromedio(id_producto) {
    const [rows] = await pool.query(
      'SELECT ROUND(AVG(calificacion), 1) AS promedio, COUNT(*) AS total_comentarios FROM comentario WHERE id_producto = ?',
      [id_producto]
    );
    return rows[0];
  }

  async findById(id_comentario) {
    const [rows] = await pool.query('SELECT * FROM comentario WHERE id_comentario = ?', [id_comentario]);
    return rows[0];
  }

  async remove(id_comentario) {
    await pool.query('DELETE FROM comentario WHERE id_comentario = ?', [id_comentario]);
  }
}

module.exports = new ComentarioRepository();