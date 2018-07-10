const sequelize = require('../lib/Sequelize');
const Sequelize = require('sequelize');

const Courier = sequelize.define('courier', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    courierName: {type: Sequelize.STRING, unique: true, allowNull: false}
});

module.exports = Courier;