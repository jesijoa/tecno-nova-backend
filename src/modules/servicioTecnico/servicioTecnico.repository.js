const pool = require('../../config/db');

class ServicioTecnicoRepository {
  async create(id_cliente, id_producto, id_pedido, descripcion) {
    const [result] = await pool.query(
      'INSERT INTO servicio_tecnico (id_cliente, id_producto, id_pedido, descripcion) VALUES (?, ?, ?, ?)',
      [id_cliente, id_producto, id_pedido || null, descripcion]
    );
    return { id_servicio: result.insertId, id_cliente, id_producto, id_pedido, descripcion, estado: 'radicado' };
  }

  async findByCliente(id_cliente) {
    const [rows] = await pool.query(
      'SELECT * FROM servicio_tecnico WHERE id_cliente = ? ORDER BY fecha_solicitud DESC',
      [id_cliente]
    );
    return rows;
  }

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM servicio_tecnico ORDER BY fecha_solicitud DESC');
    return rows;
  }

  async findById(id_servicio) {
    const [rows] = await pool.query('SELECT * FROM servicio_tecnico WHERE id_servicio = ?', [id_servicio]);
    return rows[0];
  }

  async asignar(id_servicio, id_administrador_asignado) {
    await pool.query(
      "UPDATE servicio_tecnico SET id_administrador_asignado = ?, estado = 'en_proceso' WHERE id_servicio = ?",
      [id_administrador_asignado, id_servicio]
    );
  }

  async resolver(id_servicio) {
    await pool.query(
      "UPDATE servicio_tecnico SET estado = 'resuelto', fecha_resolucion = NOW() WHERE id_servicio = ?",
      [id_servicio]
    );
  }
}

module.exports = new ServicioTecnicoRepository();