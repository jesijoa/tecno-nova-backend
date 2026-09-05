// Única capa que habla directamente con la base de datos
const pool = require('../../config/db');

class CarritoRepository {
  async findActivoByCliente(id_cliente) {
    const [rows] = await pool.query(
      'SELECT id_carrito, id_cliente, fecha_creacion, total, estado FROM carrito WHERE id_cliente = ? AND estado = TRUE AND deleted_at IS NULL',
      [id_cliente]
    );
    return rows[0];
  }

  async create(id_cliente) {
    const [result] = await pool.query(
      'INSERT INTO carrito (id_cliente) VALUES (?)',
      [id_cliente]
    );
    return { id_carrito: result.insertId, id_cliente, total: 0 };
  }

  async findItems(id_carrito) {
    const [rows] = await pool.query(
      `SELECT dc.id_detalle_carrito, dc.id_producto, p.nombre_producto, dc.cantidad, dc.precio_unitario, dc.subtotal
       FROM detalle_carrito dc
       JOIN producto p ON p.id_producto = dc.id_producto
       WHERE dc.id_carrito = ?`,
      [id_carrito]
    );
    return rows;
  }

  async findItem(id_carrito, id_producto) {
    const [rows] = await pool.query(
      'SELECT * FROM detalle_carrito WHERE id_carrito = ? AND id_producto = ?',
      [id_carrito, id_producto]
    );
    return rows[0];
  }

  async addItem(id_carrito, id_producto, cantidad, precio_unitario) {
    const subtotal = cantidad * precio_unitario;
    await pool.query(
      'INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [id_carrito, id_producto, cantidad, precio_unitario, subtotal]
    );
  }

  async updateItemCantidad(id_detalle_carrito, cantidad) {
    await pool.query(
      'UPDATE detalle_carrito SET cantidad = ?, subtotal = precio_unitario * ? WHERE id_detalle_carrito = ?',
      [cantidad, cantidad, id_detalle_carrito]
    );
  }

  async removeItem(id_detalle_carrito) {
    await pool.query('DELETE FROM detalle_carrito WHERE id_detalle_carrito = ?', [id_detalle_carrito]);
  }

  async vaciar(id_carrito) {
    await pool.query('DELETE FROM detalle_carrito WHERE id_carrito = ?', [id_carrito]);
  }

  async actualizarTotal(id_carrito) {
    const [rows] = await pool.query(
      'SELECT COALESCE(SUM(subtotal), 0) AS total FROM detalle_carrito WHERE id_carrito = ?',
      [id_carrito]
    );
    await pool.query('UPDATE carrito SET total = ? WHERE id_carrito = ?', [rows[0].total, id_carrito]);
    return rows[0].total;
  }
}

module.exports = new CarritoRepository();