const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.newTask);
router.get('/:_id', tasksController.getTaskById);
router.put('/:_id', tasksController.updateTaskById);
router.delete('/:_id', tasksController.deleteTaskById);

module.exports = router;
