const express = require('express');
const TaskController = require('../controllers/task.controller');
const router = express.Router();

router.post('/:userId', TaskController.create);

router.get('/:userId', TaskController.getAll);

router.patch('/:id', TaskController.update);

router.delete('/:id', TaskController.delete);

module.exports = router;