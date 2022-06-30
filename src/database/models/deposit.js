'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deposit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deposit.init({
    senderId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    amountInEthers: DataTypes.STRING,
    chainId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Deposit',
  });
  return Deposit;
};