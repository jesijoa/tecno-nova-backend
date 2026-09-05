const METODOS_VALIDOS = ['tarjeta', 'pse', 'efectivo', 'transferencia'];
const ESTADOS_VALIDOS = ['pendiente', 'aprobado', 'rechazado'];

function validateCreatePago(req, res, next) {
  const { id_pedido, metodo_pago } = req.body;
  if (!id_pedido) {
    return res.status(400).json({ message: 'id_pedido es obligatorio' });
  }
  if (!metodo_pago || !METODOS_VALIDOS.includes(metodo_pago)) {
    return res.status(400).json({ message: `metodo_pago debe ser uno de: ${METODOS_VALIDOS.join(', ')}` });
  }
  next();
}

function validateUpdateEstado(req, res, next) {
  const { estado } = req.body;
  if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({ message: `estado debe ser uno de: ${ESTADOS_VALIDOS.join(', ')}` });
  }
  next();
}

module.exports = { validateCreatePago, validateUpdateEstado };