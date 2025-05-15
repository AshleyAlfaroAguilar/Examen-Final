const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud_products', 'postgres', '1234567', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5433
});

// Verificamos la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
