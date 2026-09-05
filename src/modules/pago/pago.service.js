const pagoRepository = require('./pago.repository');

class PagoService {
  async registrarPago(id_cliente, id_pedido, metodo_pago) {
    const pedido = await pagoRepository.findPedido(id_pedido);
    if (!pedido) {
      const error = new Error('Pedido no encontrado');
      error.statusCode = 404;
      throw error;
    }
    if (pedido.id_cliente !== id_cliente) {
      const error = new Error('Este pedido no pertenece al cliente autenticado');
      error.statusCode = 403;
      throw error;
    }

    const pagoExistente = await pagoRepository.findByPedido(id_pedido);
    if (pagoExistente) {
      const error = new Error('Este pedido ya tiene un pago registrado');
      error.statusCode = 409;
      throw error;
    }

    return pagoRepository.create(id_pedido, metodo_pago, pedido.total);
  }

  async obtener(id_pago) {
    const pago = await pagoRepository.findById(id_pago);
    if (!pago) {
      const error = new Error('Pago no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return pago;
  }

  async actualizarEstado(id_pago, estado) {
    await this.obtener(id_pago);
    await pagoRepository.updateEstado(id_pago, estado);

    if (estado === 'aprobado') {
      const pago = await pagoRepository.findById(id_pago);
      await pagoRepository.updatePedidoEstado(pago.id_pedido, 'pagado');
    }

    return this.obtener(id_pago);
  }
}

module.exports = new PagoService();