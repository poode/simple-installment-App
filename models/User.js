const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../config/database');

class User extends Model {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    static async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize, modelName: 'user' }).bind(User);

module.exports = User;
