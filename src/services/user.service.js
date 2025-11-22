const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

class UserService {
    static async create(userData) {
        try {
            const existing = await UserModel.selectByEmail(userData.email);
            if (existing) return { conflict: true }

            const passwordHash = await bcrypt.hash(userData.password, 12);

            const created = await UserModel.insert({
                nickname: userData.nickname,
                email: userData.email,
                phone: userData.phone,
                passwordHash: passwordHash
            });

            return { insertId: created };
        } catch (err) {
            console.error('Error in UserService.create(): ', err);
            throw new Error('Error trying to create user');
        }
    }

    static async login(userData) {
        try {
            const user = await UserModel.selectByEmail(userData.email);
            if (!user) return { notFound: true }

            const isPasswordValid = await bcrypt.compare(userData.password, user.password_hash);

            return { isPasswordValid };
        } catch (err) {
            console.error('Error in UserService.login(): ', err);
            throw new Error('Error trying to login user');
        }
    }

    static async findById(id) {
        try {
            const user = await UserModel.selectById(id);

            return user;
        } catch (err) {
            console.error('Error in UserService.findById(): ', err);
            throw new Error('Error trying to find user by id');
        }
    }

    static async findAll(data) {
        const limit = data.limit ? data.limit : 50;
        const offset = data.offset ? data.offset : 0;
        const orderBy = data.orderBy == 'ASC' ? 'ASC' : 'DESC';

        try {
            const users = await UserModel.selectAll({ limit, offset, orderBy });

            return users;
        } catch (err) {
            console.error('Error in UserService.error(): ', err);
            throw new Error('Failed to find users');
        }
    }

    static async update(params) {
        try {
            const existing = await UserModel.selectById(params.id);
            if (!existing) return { notFound: true }

            const result = await UserModel.update(params);

            return { isUpdated: result };
        } catch (err) {
            console.error('Error in UserService.update(): ', err);
            throw new Error(`Failed to update user`);
        }
    }

    static async delete(userId) {
        try {
            const existing = await UserModel.selectById(userId);
            if (!existing) return { notFound: true }

            const result = await UserModel.delete(userId);

            return { isDeleted: result };
        } catch (err) {
            console.error('Error in UserService.update(): ', err);
            throw new Error(`Failed to update user`);
        }
    }
}

module.exports = UserService;