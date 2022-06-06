const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      isEmail: true
    },
    hashedPassword:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
