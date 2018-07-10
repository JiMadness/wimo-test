const Sequelize = require('../lib/Sequelize');
const Task = require('../models/Task');
const Courier = require('../models/Courier');
const Driver = require('../models/Driver');


module.exports.testConnection = function (callback) {
    Sequelize.authenticate().then(function () {
        console.log('DB Connected Successfully.');
        callback();
    });
};

module.exports.syncDB = function () {
    Courier.sync().then(() => Driver.sync().then(() => Task.sync()));
};