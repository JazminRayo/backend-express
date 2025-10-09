const express = require('express');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  res.json([
    { id: 1, nombre: 'Jazmín' },
    { id: 2, nombre: 'Carlos' }
  ]);
});

module.exports = router;
