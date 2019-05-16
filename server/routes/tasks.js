const express = require('express');
const taskController = require('../controllers/task.controller');
const router = express.Router();

router.get('/:userId/get', taskController.getAllTask);
router.post('/:userId/add', taskController.addTask);
router.post('/:userId/update', taskController.updateTask);
router.post('/:userId/delete/:taskId', taskController.deleteTask);

module.exports = router;
