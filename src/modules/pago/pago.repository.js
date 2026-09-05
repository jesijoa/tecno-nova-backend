const pool = require('../../config/db');

class PagoRepository {
  async findPedido(id_pedido) {
    const [rows] = await pool.query(
      'SELECT id_pedido, id_cliente, total, estado FROM pedido WHERE id_pedido = ?',
      [id_pedido]
    );
    return rows[0];
  }

  async findByPedido(id_pedido) {
    const [rows] = await pool.query('SELECT * FROM pago WHERE id_pedido = ?', [id_pedido]);
    return rows[0];
  }

  async create(id_pedido, metodo_pago, monto) {
    const [result] = await pool.query(
      'INSERT INTO pago (id_pedido, metodo_pago, monto) VALUES (?, ?, ?)',
      [id_pedido, metodo_pago, monto]
    );
    return { id_pago: result.insertId, id_pedido, metodo_pago, monto, estado: 'pendiente' };
  }

  async findById(id_pago) {
    const [rows] = await pool.query('SELECT * FROM pago WHERE id_pago = ?', [id_pago]);
    return rows[0];
  }

  async updateEstado(id_pago, estado) {
    await pool.query('UPDATE pago SET estado = ? WHERE id_pago = ?', [estado, id_pago]);
  }

  async updatePedidoEstado(id_pedido, estado) {
    await pool.query('UPDATE pedido SET estado = ? WHERE id_pedido = ?', [estado, id_pedido]);
  }
}

module.exports = new PagoRepository();