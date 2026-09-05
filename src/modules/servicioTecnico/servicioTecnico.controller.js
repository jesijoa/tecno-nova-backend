const servicioTecnicoService = require('./servicioTecnico.service');

async function create(req, res, next) {
  try {
    const { id_producto, id_pedido, descripcion } = req.body;
    const ticket = await servicioTecnicoService.radicar(req.cliente.id_cliente, id_producto, id_pedido, descripcion);
    res.status(201).json({ message: 'Solicitud de servicio tecnico radicada', data: ticket });
  } catch (err) {
    next(err);
  }
}

async function getMisSolicitudes(req, res, next) {
  try {
    const tickets = await servicioTecnicoService.listarPorCliente(req.cliente.id_cliente);
    res.status(200).json({ message: 'Solicitudes obtenidas', data: tickets });
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const tickets = await servicioTecnicoService.listarTodos();
    res.status(200).json({ message: 'Solicitudes obtenidas', data: tickets });
  } catch (err) {
    next(err);
  }
}

async function asignar(req, res, next) {
  try {
    const ticket = await servicioTecnicoService.asignar(req.params.id, req.administrador.id_administrador);
    res.status(200).json({ message: 'Solicitud asignada', data: ticket });
  } catch (err) {
    next(err);
  }
}

async function resolver(req, res, next) {
  try {
    const ticket = await servicioTecnicoService.resolver(req.params.id);
    res.status(200).json({ message: 'Solicitud resuelta', data: ticket });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getMisSolicitudes, getAll, asignar, resolver };