const request = require('request');
const async = require('async');

const Task = require('../models/Task');
const Courier = require('../models/Courier');
const Driver = require('../models/Driver');
module.exports.import = function (callback) {
    request('https://api.myjson.com/bins/b9ix6', function (err, resp, body) {
        if (err || !body) {
            console.error(err || 'No response found.');
            return;
        }
        const tasks = JSON.parse(body).tasks;
        async.each(tasks, async function (task, done) {
            let driver = await Driver.findOrCreate({where: {driverName: task.driverName}});
            let courier = await Courier.findOrCreate({where: {courierName: task.courier}});
            Task.create({
                fromLocation: task.fromLocation,
                toLocation: task.toLocation,
                deliveryDate: task.deliveryDate,
                startedAt: task.startedAt || null,
                finishedAt: task.finishedAt || null,
                driverId: driver[0].dataValues._id,
                courierId: courier[0].dataValues._id,
                description: task.description,
                status: task.status,
                driverComment: task.driverComment
            }).then(() => done);
        }, function () {
            callback();
        });
    });

};
