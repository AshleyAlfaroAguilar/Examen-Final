const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');


// Crear producto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = await Product.create({ name, description, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto', details: error });
  }
});

module.exports = router;
