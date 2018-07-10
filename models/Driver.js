const sequelize = require('../lib/Sequelize');
const Sequelize = require('sequelize');

const Driver = sequelize.define('driver', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    driverName: {type: Sequelize.STRING, unique: true, allowNull: false}
});

module.exports = Driver;