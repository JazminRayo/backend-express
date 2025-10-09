const express = require('express');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Importar las rutas (que crearemos luego)
const rutasProductos = require('./routes/productos');
const rutasUsuarios = require('./routes/usuarios');

// Usar las rutas en el servidor
app.use('/api/productos', rutasProductos);
app.use('/api/usuarios', rutasUsuarios);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido al backend con Express 🚀');
});

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
