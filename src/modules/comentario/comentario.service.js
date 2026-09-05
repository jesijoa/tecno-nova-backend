const comentarioRepository = require('./comentario.repository');
const productoRepository = require('../producto/producto.repository');

class ComentarioService {
  async crear(id_cliente, id_producto, calificacion, contenido) {
    const producto = await productoRepository.findById(id_producto);
    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return comentarioRepository.create(id_cliente, id_producto, calificacion, contenido);
  }

  async listarPorProducto(id_producto) {
    const comentarios = await comentarioRepository.findByProducto(id_producto);
    const resumen = await comentarioRepository.findPromedio(id_producto);
    return {
      promedio: Number(resumen.promedio) || 0,
      total_comentarios: resumen.total_comentarios,
      comentarios,
    };
  }

  async eliminar(id_cliente, id_comentario) {
    const comentario = await comentarioRepository.findById(id_comentario);
    if (!comentario) {
      const error = new Error('Comentario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    if (comentario.id_cliente !== id_cliente) {
      const error = new Error('No puedes eliminar un comentario que no es tuyo');
      error.statusCode = 403;
      throw error;
    }
    await comentarioRepository.remove(id_comentario);
  }
}

module.exports = new ComentarioService();