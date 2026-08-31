const pool = require('../../config/db');

class PedidoRepository {
  async getProducto(id_producto) {
    const [rows] = await pool.query(
      'SELECT id_producto, precio, stock FROM Producto WHERE id_producto = ? AND deleted_at IS NULL',
      [id_producto]
    );
    return rows[0];
  }

  async crearPedidoConDetalle(id_cliente, items, total) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [pedidoResult] = await conn.query(
        'INSERT INTO Pedido (id_cliente, total) VALUES (?, ?)',
        [id_cliente, total]
      );
      const id_pedido = pedidoResult.insertId;

      for (const item of items) {
        await conn.query(
          'INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
          [id_pedido, item.id_producto, item.cantidad, item.precio_unitario, item.subtotal]
        );
        await conn.query(
          'UPDATE Producto SET stock = stock - ? WHERE id_producto = ?',
          [item.cantidad, item.id_producto]
        );
      }

      await conn.commit();
      return id_pedido;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM Pedido ORDER BY fecha_pedido DESC');
    return rows;
  }

  async findById(id) {
    const [pedido] = await pool.query('SELECT * FROM Pedido WHERE id_pedido = ?', [id]);
    const [detalle] = await pool.query('SELECT * FROM DetallePedido WHERE id_pedido = ?', [id]);
    return { ...pedido[0], detalle };
  }

  async findByCliente(id_cliente) {
    const [rows] = await pool.query('SELECT * FROM Pedido WHERE id_cliente = ? ORDER BY fecha_pedido DESC', [id_cliente]);
    return rows;
  }

  async updateStatus(id, estado) {
    await pool.query('UPDATE Pedido SET estado = ? WHERE id_pedido = ?', [estado, id]);
  }
}

module.exports = new PedidoRepository();