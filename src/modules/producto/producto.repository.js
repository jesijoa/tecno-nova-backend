// Única capa que habla directamente con la base de datos
const pool = require('../../config/db');

class ProductoRepository {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio, p.stock, p.estado,
              p.id_categoria, c.nombre_categoria
       FROM Producto p
       LEFT JOIN Categoria c ON c.id_categoria = p.id_categoria
       WHERE p.deleted_at IS NULL`
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id_producto, id_administrador, nombre_producto, descripcion, precio, stock, estado FROM Producto WHERE id_producto = ? AND deleted_at IS NULL',
      [id]
    );
    return rows[0];
  }

  async create(producto) {
    const { id_administrador, nombre_producto, descripcion, precio, stock } = producto;
    const [result] = await pool.query(
      'INSERT INTO Producto (id_administrador, nombre_producto, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)',
      [id_administrador || null, nombre_producto, descripcion, precio, stock]
    );
    return { id_producto: result.insertId, nombre_producto, descripcion, precio, stock };
  }

  async update(id, producto) {
    const { nombre_producto, descripcion, precio } = producto;
    await pool.query(
      'UPDATE Producto SET nombre_producto = ?, descripcion = ?, precio = ? WHERE id_producto = ?',
      [nombre_producto, descripcion, precio, id]
    );
  }

  async updateStock(id, stock) {
    await pool.query('UPDATE Producto SET stock = ? WHERE id_producto = ?', [stock, id]);
  }

  async updateStatus(id, estado) {
    await pool.query('UPDATE Producto SET estado = ? WHERE id_producto = ?', [estado, id]);
  }

  async softDelete(id) {
    await pool.query('UPDATE Producto SET estado = false, deleted_at = NOW() WHERE id_producto = ?', [id]);
  }
}

module.exports = new ProductoRepository();