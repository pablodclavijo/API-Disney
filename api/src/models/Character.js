const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    iamge:{
      type: DataTypes.STRING,
      allowNull: false
    },
    age:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    story:{
      type: DataTypes.STRING,
      allowNull: false
    }

});
}