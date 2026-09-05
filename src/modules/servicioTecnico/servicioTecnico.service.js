const servicioTecnicoRepository = require('./servicioTecnico.repository');
const productoRepository = require('../producto/producto.repository');

class ServicioTecnicoService {
  async radicar(id_cliente, id_producto, id_pedido, descripcion) {
    const producto = await productoRepository.findById(id_producto);
    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return servicioTecnicoRepository.create(id_cliente, id_producto, id_pedido, descripcion);
  }

  async listarPorCliente(id_cliente) {
    return servicioTecnicoRepository.findByCliente(id_cliente);
  }

  async listarTodos() {
    return servicioTecnicoRepository.findAll();
  }

  async asignar(id_servicio, id_administrador_asignado) {
    const ticket = await servicioTecnicoRepository.findById(id_servicio);
    if (!ticket) {
      const error = new Error('Solicitud no encontrada');
      error.statusCode = 404;
      throw error;
    }
    await servicioTecnicoRepository.asignar(id_servicio, id_administrador_asignado);
    return servicioTecnicoRepository.findById(id_servicio);
  }

  async resolver(id_servicio) {
    const ticket = await servicioTecnicoRepository.findById(id_servicio);
    if (!ticket) {
      const error = new Error('Solicitud no encontrada');
      error.statusCode = 404;
      throw error;
    }
    await servicioTecnicoRepository.resolver(id_servicio);
    return servicioTecnicoRepository.findById(id_servicio);
  }
}

module.exports = new ServicioTecnicoService();