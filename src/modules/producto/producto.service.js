// Aquí viven las reglas de negocio del Producto
const productoRepository = require('./producto.repository');

class ProductoService {
  async getAll() {
    return productoRepository.findAll();
  }

  async getById(id) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return producto;
  }

  async create(data) {
    return productoRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id); // valida que exista
    await productoRepository.update(id, data);
    return this.getById(id);
  }

  async updateStock(id, stock) {
    if (isNaN(stock) || Number(stock) < 0) {
      const error = new Error('El stock debe ser un numero mayor o igual a 0');
      error.statusCode = 400;
      throw error;
    }
    await this.getById(id);
    await productoRepository.updateStock(id, stock);
  }

  async updateStatus(id, estado) {
    if (typeof estado !== 'boolean') {
      const error = new Error('El estado debe ser true o false');
      error.statusCode = 400;
      throw error;
    }
    await this.getById(id);
    await productoRepository.updateStatus(id, estado);
  }

  async delete(id) {
    await this.getById(id);
    await productoRepository.softDelete(id);
  }
}

module.exports = new ProductoService();