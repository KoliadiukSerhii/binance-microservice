const sequelize = require('../database/createPostgreDB');
const { DataTypes } = require('sequelize');

const CryptoCurrency = sequelize.define('cryptocurrency', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	price: { type: DataTypes.DOUBLE },
	isIncreased: { type: DataTypes.BOOLEAN },
});

export { CryptoCurrency };
