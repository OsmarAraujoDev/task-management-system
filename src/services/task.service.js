const TaskModel = require('../models/task.models');

class TaskService {
    static async create(taskData) {
        try {
            const task = await TaskModel.insert(taskData);

            return { insertId: task };
        } catch (err) {
            console.error('Error in TaskService.create(): ', err);
            throw new Error('Error trying to create task');
        }
    }

    static async findAll(params) {
        try {
            const tasks = await TaskModel.selectAll(params);

            return tasks;
        } catch (err) {
            console.error('Error in TaskService.findAll(): ', err);
            throw new Error('Error trying to find tasks');
        }
    }

    static async update(params) {
        const allowedFields = ['title', 'description', 'status'];
        if (!allowedFields.includes(params?.field)) return { invalidField: true };

        params.value = params.field == 'status' ? Number(params.value) : params.value;

        try {
            const existing = await TaskModel.selectById(params?.taskId);
            if (!existing) return { notFound: true };

            const task = await TaskModel.update(params);

            return { affectedRows: task };
        } catch (err) {
            console.error('Error in TaskService.update(): ', err);
            throw new Error('Error trying to update task');
        }
    }

    static async delete(taskId) {
        try {
            const existing = await TaskModel.selectById(taskId);
            if (!existing) return { notFound: true };

            const task = await TaskModel.delete(taskId);

            return { affectedRows: task };
        } catch (err) {
            console.error('Error in TaskService.delete(): ', err);
            throw new Error('Error trying to delete task');
        }
    }
}

module.exports = TaskService;