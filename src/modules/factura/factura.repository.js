const pool = require('../../config/db');

class FacturaRepository {
  async findPedido(id_pedido) {
    const [rows] = await pool.query(
      'SELECT id_pedido, id_cliente, total FROM pedido WHERE id_pedido = ?',
      [id_pedido]
    );
    return rows[0];
  }

  async findPagoAprobado(id_pedido) {
    const [rows] = await pool.query(
      "SELECT id_pago, estado FROM pago WHERE id_pedido = ? AND estado = 'aprobado'",
      [id_pedido]
    );
    return rows[0];
  }

  async findByPedido(id_pedido) {
    const [rows] = await pool.query('SELECT * FROM factura WHERE id_pedido = ?', [id_pedido]);
    return rows[0];
  }

  async create(id_pedido, id_pago, numero_factura, subtotal, iva, total) {
    const [result] = await pool.query(
      'INSERT INTO factura (id_pedido, id_pago, numero_factura, subtotal, iva, total) VALUES (?, ?, ?, ?, ?, ?)',
      [id_pedido, id_pago, numero_factura, subtotal, iva, total]
    );
    return { id_factura: result.insertId, id_pedido, id_pago, numero_factura, subtotal, iva, total };
  }

  async findById(id_factura) {
    const [rows] = await pool.query('SELECT * FROM factura WHERE id_factura = ?', [id_factura]);
    return rows[0];
  }
}

module.exports = new FacturaRepository();