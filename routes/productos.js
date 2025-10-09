const express = require('express');
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  res.json([
    { id: 1, nombre: 'Laptop', precio: 1200 },
    { id: 2, nombre: 'Mouse', precio: 25 }
  ]);
});

module.exports = router;
