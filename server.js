const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Product = require('./models/product.model');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/product.routes'));

// Ruta para crear un producto
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Ruta para modificar el producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    // Verificar si el producto existe
    const producto = await Product.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto
    await producto.update({ name, description, price, stock });

    res.json({ message: 'Producto actualizado correctamente', producto });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

//obtener un producto en específico (ID)

app.get('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Product.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

//elimina productos 

app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Product.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});


const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.sync(); // Crea tabla si no existe
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
});
