const carritoService = require('./carrito.service');

async function getCarrito(req, res, next) {
  try {
    const carrito = await carritoService.obtenerConItems(req.cliente.id_cliente);
    res.status(200).json(carrito);
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const { id_producto, cantidad } = req.body;
    const carrito = await carritoService.agregarProducto(req.cliente.id_cliente, id_producto, cantidad);
    res.status(201).json({ message: 'Producto agregado al carrito', data: carrito });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const carrito = await carritoService.actualizarCantidad(req.cliente.id_cliente, req.params.id, req.body.cantidad);
    res.status(200).json({ message: 'Cantidad actualizada', data: carrito });
  } catch (err) {
    next(err);
  }
}

async function removeItem(req, res, next) {
  try {
    const carrito = await carritoService.eliminarItem(req.cliente.id_cliente, req.params.id);
    res.status(200).json({ message: 'Producto eliminado del carrito', data: carrito });
  } catch (err) {
    next(err);
  }
}

async function clear(req, res, next) {
  try {
    const carrito = await carritoService.vaciar(req.cliente.id_cliente);
    res.status(200).json({ message: 'Carrito vaciado', data: carrito });
  } catch (err) {
    next(err);
  }
}
async function confirmarCompra(req, res, next) {
  try {
    const pedido = await carritoService.confirmarCompra(req.cliente.id_cliente);
    res.status(201).json({ message: 'Compra confirmada, pedido creado', data: pedido });
  } catch (err) {
    next(err);
  }
}
module.exports = { getCarrito, addItem, updateItem, removeItem, clear };
module.exports = { getCarrito, addItem, updateItem, removeItem, clear, confirmarCompra };
