const carritoRepository = require('./carrito.repository');
const productoRepository = require('../producto/producto.repository');
const pedidoService = require('../pedido/pedido.service');

class CarritoService {
  async obtenerOCrear(id_cliente) {
    let carrito = await carritoRepository.findActivoByCliente(id_cliente);
    if (!carrito) {
      carrito = await carritoRepository.create(id_cliente);
    }
    return carrito;
  }

  async obtenerConItems(id_cliente) {
    const carrito = await this.obtenerOCrear(id_cliente);
    const items = await carritoRepository.findItems(carrito.id_carrito);
    return { ...carrito, items };
  }

  async agregarProducto(id_cliente, id_producto, cantidad) {
    const producto = await productoRepository.findById(id_producto);
    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const carrito = await this.obtenerOCrear(id_cliente);
    const itemExistente = await carritoRepository.findItem(carrito.id_carrito, id_producto);

    if (itemExistente) {
      await carritoRepository.updateItemCantidad(itemExistente.id_detalle_carrito, itemExistente.cantidad + cantidad);
    } else {
      await carritoRepository.addItem(carrito.id_carrito, id_producto, cantidad, producto.precio);
    }

    await carritoRepository.actualizarTotal(carrito.id_carrito);
    return this.obtenerConItems(id_cliente);
  }

  async actualizarCantidad(id_cliente, id_detalle_carrito, cantidad) {
    const carrito = await this.obtenerOCrear(id_cliente);
    await carritoRepository.updateItemCantidad(id_detalle_carrito, cantidad);
    await carritoRepository.actualizarTotal(carrito.id_carrito);
    return this.obtenerConItems(id_cliente);
  }

  async eliminarItem(id_cliente, id_detalle_carrito) {
    const carrito = await this.obtenerOCrear(id_cliente);
    await carritoRepository.removeItem(id_detalle_carrito);
    await carritoRepository.actualizarTotal(carrito.id_carrito);
    return this.obtenerConItems(id_cliente);
  }

  async vaciar(id_cliente) {
    const carrito = await this.obtenerOCrear(id_cliente);
    await carritoRepository.vaciar(carrito.id_carrito);
    await carritoRepository.actualizarTotal(carrito.id_carrito);
    return this.obtenerConItems(id_cliente);
   }

  async confirmarCompra(id_cliente) {
    const carrito = await this.obtenerConItems(id_cliente);
    if (!carrito.items || carrito.items.length === 0) {
      const error = new Error('El carrito está vacío, agrega productos antes de confirmar la compra');
      error.statusCode = 400;
      throw error;
    }

    const items = carrito.items.map((item) => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad,
    }));

    const pedido = await pedidoService.crearPedido(id_cliente, items);

    await carritoRepository.vaciar(carrito.id_carrito);
    await carritoRepository.actualizarTotal(carrito.id_carrito);

       return pedido;
  }
}

module.exports = new CarritoService();