const sequelize = require('../lib/Sequelize');
const Sequelize = require('sequelize');
const Courier = require('./Courier');
const Driver = require('./Driver');

const Task = sequelize.define('task', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    fromLocation: {type: Sequelize.STRING, allowNull: false},
    toLocation: {type: Sequelize.STRING, allowNull: false},
    deliveryDate: {type: Sequelize.DATEONLY, allowNull: false},
    startedAt: {type: Sequelize.DATE},
    finishedAt: {type: Sequelize.DATE},
    driverId: {
        type: Sequelize.INTEGER, references: {
            model: Driver,
            key: '_id'
        }, allowNull: false
    },
    courierId: {
        type: Sequelize.INTEGER, references: {
            model: Courier,
            key: '_id'
        }, allowNull: false
    },
    description: {type: Sequelize.TEXT},
    status: {
        type: Sequelize.ENUM('pending', 'started', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    driverComment: {type: Sequelize.STRING}
});

Task.belongsTo(Driver);
Task.belongsTo(Courier);

module.exports = Task;