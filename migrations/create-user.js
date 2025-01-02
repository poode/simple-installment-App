const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
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
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        });

        const hashedPassword = await bcrypt.hash('13070240', 10);
        await queryInterface.bulkInsert('users', [
            {
                username: 'poode',
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async ({ context: queryInterface }) => {
        // Drop the 'users' table
        await queryInterface.dropTable('users');
    },
};
