const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clienteRoutes = require('./modules/cliente');
const productoRoutes = require('./modules/producto');
const authRoutes = require('./modules/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Tecno Nova API is running' });
});

app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tecno Nova server running on http://localhost:${PORT}`);
});