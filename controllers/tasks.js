const Task = require('../models/Task');
const Courier = require('../models/Courier');
const Driver = require('../models/Driver');


module.exports.newTask = async function (req, res, next) {
    try {
        let driver = await Driver.findOrCreate({where: {driverName: req.body.payload.driverName}});
        let courier = await Courier.findOrCreate({where: {courierName: req.body.payload.courier}});
        let task = await Task.create({
            fromLocation: req.body.payload.fromLocation,
            toLocation: req.body.payload.toLocation,
            deliveryDate: req.body.payload.deliveryDate,
            startedAt: req.body.payload.startedAt || null,
            finishedAt: req.body.payload.finishedAt || null,
            driverId: driver[0].dataValues._id,
            courierId: courier[0].dataValues._id,
            description: req.body.payload.description,
            status: req.body.payload.status,
            driverComment: req.body.payload.driverComment
        });
        if (!task)
            res.status(500).send('Task creation failed.');
        else res.json({
            task: await Task.findById(task._id, {
                include: [Driver, Courier],
                attributes: ['_id', 'fromLocation', 'toLocation', 'deliveryDate', 'status', 'startedAt', 'finishedAt',
                    'description', 'driver.driverName', 'courier.courierName', 'driverComment', 'createdAt', 'updatedAt'
                ]
            })
        });
    }
    catch (error) {
        next(error);
    }
};

module.exports.getTaskById = async function (req, res, next) {
    try {
        let _id = req.params._id;
        let task = await Task.findById(_id, {
            include: [Driver, Courier],
            attributes: ['_id', 'fromLocation', 'toLocation', 'deliveryDate', 'status', 'startedAt', 'finishedAt',
                'description', 'driver.driverName', 'courier.courierName', 'driverComment', 'createdAt', 'updatedAt'
            ]
        });
        if (!task)
            res.status(404).send('Task not found.');
        else res.json({task: task});
    }
    catch (error) {
        next(error);
    }
};

module.exports.getAllTasks = async function (req, res, next) {
    try {
        let sortingCriteria = req.query.sort_by || 'deliveryDate';
        let tasks = await Task.findAll({
            order: [[sortingCriteria]],
            include: [Driver, Courier],
            attributes: ['_id', 'fromLocation', 'toLocation', 'deliveryDate', 'status', 'startedAt', 'finishedAt',
                'description', 'driver.driverName', 'courier.courierName', 'driverComment', 'createdAt', 'updatedAt'
            ]
        });
        res.json({tasks: tasks});
    }
    catch (error) {
        next(error);
    }
};


module.exports.updateTaskById = async function (req, res, next) {
    try {
        console.log(req.body);
        let _id = req.params._id;
        let body = req.body.payload;
        let task = await Task.findById(_id, {
            include: [Driver, Courier]
        });
        if (!task) {
            res.status(404).send('Task not found.');
            return;
        }
        if (body.driverComment)
            task.driverComment = body.driverComment;
        if (body.status) {
            switch (body.status) {
                case 'started':
                    task.status = 'started';
                    task.startedAt = new Date();
                    break;
                case 'pending':
                    if (task.status !== 'pending')
                        res.status(500).send("Can't set task status to pending after starting it.");
                    else res.status(500).send('Task is already pending');
                    break;
                case 'completed':
                    if (task.status !== 'started') {
                        res.status(500).send("Can't set task status to completed before starting it.");
                        return;
                    }
                    task.status = 'completed';
                    task.finishedAt = new Date();
                    break;
                case 'failed':
                    if (task.status !== 'started') {
                        res.status(500).send("Can't set task status to failed before starting it.");
                        return;
                    }
                    task.status = 'failed';
                    task.finishedAt = new Date();
                    break;
                default:
                    res.status(500).send("Invalid status.");
                    break;
            }
        }
        let savedTask = await task.save({returning: true});
        if (!savedTask)
            res.status(404).send('Task not found after update.');
        else res.json({task: savedTask});
    }
    catch (error) {
        next(error);
    }
};

module.exports.deleteTaskById = async function (req, res, next) {
    try {
        let _id = req.params._id;
        await Task.destroy({
            where: {
                _id: _id
            }
        });
        res.send('Task ' + req.params._id + ' deleted successfully.');
    }
    catch (error) {
        next(error);
    }
};