const TaskService = require('../services/task.service');
const taskSchemas = require('../validations/task.validations');

class TaskController {
    static async create(req, res) {
        const { error, value } = taskSchemas.create.validate(req.body);
        const { userId } = req.params;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const task = await TaskService.create({
                title: value.title,
                description: value.description,
                userId: userId
            });

            if (!task) {
                return res.status(500).json({
                    success: false,
                    message: 'operação falhou ao criar tarefa'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'tarefa criada com sucesso',
                data: { taskId: task.insertId }
            });
        } catch (err) {
            console.error('Error in TaskController.create(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async getAll(req, res) {
        const { error, value } = taskSchemas.getAll.validate(req.query);
        const { userId } = req.params;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        value.userId = userId;

        try {
            const tasks = await TaskService.findAll(value);

            if (!tasks.length) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhuma tarefa encontrada'
                });
            }

            return res.status(200).json({
                success: true,
                message: `${tasks.length} tarefas encontradas`,
                data: tasks
            });
        } catch (err) {
            console.error('Error in TasksController.getAll(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async update(req, res) {
        const { error, value } = taskSchemas.update.validate(req.body);
        const { id } = req.params;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        if (value?.field == 'status' && value?.value > 4 || value?.value < 1) {
            return res.status(400).json({
                success: false,
                message: 'status tem que estar entre 1 e 4'
            });
        }

        value.taskId = id;

        try {
            const task = await TaskService.update(value);

            if (task?.invalidField) {
                return res.status(400).json({
                    success: false,
                    message: `${field} não é valido`
                });
            }

            if (task?.notFound) {
                return res.status(404).json({
                    success: false,
                    message: `nenhuma tarefa encontrada com esse id`
                });
            }

            if (!task?.affectedRows) {
                return res.status(500).json({
                    success: false,
                    message: `falha na operação de atualizar tarefa`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'tarefa atualizado com sucesso'
            });
        } catch (err) {
            console.error('Error in TasksController.update(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const task = await TaskService.delete(id);

            if (!task?.affectedRows) {
                return res.status(500).json({
                    success: false,
                    message: `falha na operação de deletar tarefa`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'tarefa deletada com sucesso'
            });
        } catch (err) {
            console.error('Error in TasksController.update(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }
}

module.exports = TaskController;