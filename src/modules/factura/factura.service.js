const facturaRepository = require('./factura.repository');

const PORCENTAJE_IVA = 0.19;

class FacturaService {
  async generar(id_cliente, id_pedido) {
    const pedido = await facturaRepository.findPedido(id_pedido);
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

    const facturaExistente = await facturaRepository.findByPedido(id_pedido);
    if (facturaExistente) {
      const error = new Error('Este pedido ya tiene una factura generada');
      error.statusCode = 409;
      throw error;
    }

    const pagoAprobado = await facturaRepository.findPagoAprobado(id_pedido);
    if (!pagoAprobado) {
      const error = new Error('No se puede facturar: el pago de este pedido no esta aprobado todavia');
      error.statusCode = 400;
      throw error;
    }

    const subtotal = Number(pedido.total);
    const iva = Number((subtotal * PORCENTAJE_IVA).toFixed(2));
    const total = Number((subtotal + iva).toFixed(2));
    const numero_factura = `FAC-${String(id_pedido).padStart(6, '0')}`;

    return facturaRepository.create(id_pedido, pagoAprobado.id_pago, numero_factura, subtotal, iva, total);
  }

  async obtener(id_factura) {
    const factura = await facturaRepository.findById(id_factura);
    if (!factura) {
      const error = new Error('Factura no encontrada');
      error.statusCode = 404;
      throw error;
    }
    return factura;
  }
}

module.exports = new FacturaService();