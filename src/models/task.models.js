const pool = require('../config/database');

class TaskModel {
    static async insert(taskData) {
        const { title, description, userId } = taskData;
        
        try {
            const [result] = await pool.query(
                'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
                [title, description, userId]
            );

            return result.insertId;
        } catch (err) {
            console.error('Error in TaskModel.create(): ', err);
            throw new Error('Error trying to insert task in the database');
        }
    }

    static async selectAll(params) {
        const { limit, offset, sortBy, sortOrder } = params;

        let whereClauses = [];
        let sqlParams = [];

        if (params?.id) {
            whereClauses.push(' id = ?');
            sqlParams.push(params.id);
        }

        if (params?.title) {
            whereClauses.push(' title LIKE ?');
            sqlParams.push(`%${params.title}%`);
        }

        if (params?.description) {
            whereClauses.push(' description LIKE ?');
            sqlParams.push(`%${params.description}%`);
        }

        if (params?.status) {
            whereClauses.push(' status = ?');
            sqlParams.push(`%${params.status}%`);
        }

        if (params?.created_at_start) {
            whereClauses.push(' created_at >= ?');
            sqlParams.push(params.created_at_start);
        }

        if (params?.created_at_end) {
            whereClauses.push(' created_at <= ?');
            sqlParams.push(params.created_at_end);
        }

        const whereText = whereClauses.length > 0 ? `WHERE user_id = ? AND ${whereClauses.join(' AND ')}` : '';

        try {
            const [rows] = await pool.query(
                `SELECT id, title, description, status, created_at, update_at FROM tasks ${whereText} ORDER BY ${sortBy || 'id'} ${sortOrder || 'ASC'} LIMIT ${limit || 50} OFFSET ${offset || 0}`,
                [params.userId, ...sqlParams]
            );

            const modifiedRows = rows.map((x) => {
                let statusText;
                switch (x.status) {
                    case 1:
                        statusText = 'Pendente';
                        break;
                    case 2:
                        statusText = 'Em andamento';
                        break;
                    case 3:
                        statusText = 'Concluído';
                        break;
                    case 4:
                        statusText = 'Cancelado';
                        break;
                    default:
                        statusText = x.status;
                        break;
                }
                return { ...x, status: statusText };
            });

            return modifiedRows;
        } catch (err) {
            console.error('Error in TaskModel.selectAll(): ', err);
            throw new Error('Error trying to select tasks in the database');
        }
    }

    static async selectById(taskId) {
        try {
            const [rows] = await pool.query(
                'SELECT id, title, description, status, created_at, update_at FROM tasks WHERE id = ?',
                [taskId]
            );

            return rows[0];
        } catch (err) {
            console.error('Error in TaskModel.selectAll(): ', err);
            throw new Error('Error trying to select tasks in the database');
        }
    }

    static async update(params) {
        const { field, value, taskId } = params;

        try {
            const [result] = await pool.query(
                `UPDATE tasks SET ?? = ?, update_at = NOW() WHERE id = ?`,
                [field, value, taskId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            console.error('Error in TaskModel.update(): ', err);
            throw new Error('Error trying to update task in the database');
        }
    }

    static async delete(taskId) {
        console.log(taskId);
        try {
            const [result] = await pool.query(
                `DELETE FROM tasks WHERE id = ?`,
                [taskId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            console.error('Error in TaskModel.delete(): ', err);
            throw new Error('Error trying to delete task in the database');
        }
    }
}

module.exports = TaskModel;