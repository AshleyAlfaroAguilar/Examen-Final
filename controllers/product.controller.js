const { Product } = require('../models');

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const product = await Product.create({ name, price, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

module.exports = {
  createProduct
};
