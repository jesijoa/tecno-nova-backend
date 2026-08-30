const categoriaRepository = require('./categoria.repository');

class CategoriaService {
  async listar() {
    return categoriaRepository.findAll();
  }

  async obtener(id) {
    return categoriaRepository.findById(id);
  }

  async crear(datos) {
    return categoriaRepository.create(datos);
  }

  async actualizar(id, datos) {
    return categoriaRepository.update(id, datos);
  }

  async cambiarEstado(id, estado) {
    return categoriaRepository.updateStatus(id, estado);
  }

  async eliminar(id) {
    return categoriaRepository.softDelete(id);
  }
}

module.exports = new CategoriaService();