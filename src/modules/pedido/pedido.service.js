const pedidoRepository = require('./pedido.repository');

class PedidoService {
  async crearPedido(id_cliente, items) {
    if (!items || items.length === 0) {
      const error = new Error('El pedido debe tener al menos un producto');
      error.statusCode = 400;
      throw error;
    }

    let total = 0;
    const itemsCompletos = [];

    for (const item of items) {
      const producto = await pedidoRepository.getProducto(item.id_producto);
      if (!producto) {
        const error = new Error('Producto ' + item.id_producto + ' no existe');
        error.statusCode = 404;
        throw error;
      }
      if (producto.stock < item.cantidad) {
        const error = new Error('Stock insuficiente para el producto ' + item.id_producto);
        error.statusCode = 400;
        throw error;
      }
      const subtotal = producto.precio * item.cantidad;
      total += subtotal;
      itemsCompletos.push({
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal,
      });
    }

    const id_pedido = await pedidoRepository.crearPedidoConDetalle(id_cliente, itemsCompletos, total);
    return { id_pedido, total, items: itemsCompletos };
  }

  async listar() { return pedidoRepository.findAll(); }
  async obtener(id) { return pedidoRepository.findById(id); }
  async listarPorCliente(id_cliente) { return pedidoRepository.findByCliente(id_cliente); }
  async cambiarEstado(id, estado) { return pedidoRepository.updateStatus(id, estado); }
}

module.exports = new PedidoService();