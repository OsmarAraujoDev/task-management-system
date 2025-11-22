const pool = require('../config/database');

class UserModel {
    static async insert(userData) {
        const { nickname, email, phone, passwordHash } = userData;

        try {
            const [result] = await pool.query(
                `INSERT INTO users (nickname, email, phone, password_hash)
                VALUES (?, ?, ?, ?)`,
                [nickname, email, phone, passwordHash]
            );

            return result.insertId;
        } catch (err) {
            console.error('Error in UserModel.insert(): ', err);
            throw new Error('Error trying to insert user in the database');
        }
    }

    static async selectByEmail(email) {
        try {
            const [rows] = await pool.query(
                `SELECT id, nickname, password_hash
                FROM users
                WHERE email = ?`,
                [email]
            );

            return rows[0];
        } catch (err) {
            console.error('Error in UserModel.selectByEmail(): ', err);
            throw new Error('Error trying to fetch user by email in the database');
        }
    }

    static async selectById(id) {
        try {
            const [rows] = await pool.query(
                `SELECT id, nickname, email, phone, password_hash, created_at, update_at, is_active
                FROM users
                WHERE id = ?`,
                [id]
            );

            return rows[0];
        } catch (err) {
            console.error('Error in UserModel.selectByEmail(): ', err);
            throw new Error('Error trying to fetch user by email in the database');
        }
    }

    static async selectAll(params) {
        const { limit, offset, orderBy } = params;

        try {
            const [rows] = await pool.query(
                `SELECT id, nickname, email, phone, created_at, update_at, is_active 
                FROM users
                ORDER BY id ${orderBy}
                LIMIT ? OFFSET ?`,
                [limit, offset]
            );

            return rows;
        } catch (err) {
            console.error('Error in UserModel.selectAll(): ', err);
            throw new Error('Error trying to fetch all users in the database');
        }
    }

    static async update(params) {
        const { field, value, id } = params;
        console.log(params);

        try {
            const [result] = await pool.query(
                'UPDATE users SET ?? = ?, update_at = NOW() WHERE id = ?',
                [field, value, id]
            );

            return result.affectedRows == 1;
        } catch (err) {
            console.error('Error in UserModel.update(): ', err);
            throw new Error('Error trying to update user in the database');
        }
    }

    static async delete(userId) {
        try {
            const [result] = await pool.query(
                'DELETE FROM users WHERE id = ?',
                [userId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            console.error('Error in UserModel.delete(): ', err);
            throw new Error('Error trying to delete user in the database');
        }
    }
}

module.exports = UserModel;