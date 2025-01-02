const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Installment = sequelize.define('Installment', {
    installment_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    payer_name: { type: DataTypes.STRING, allowNull: false },
    device_name: { type: DataTypes.STRING },
    device_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    installment_percentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    down_payment: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    start_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    months_paid: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_payment: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    remaining_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    installment_months:  { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    amount_to_be_paid_per_month:  { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, {
    timestamps: true,
});

module.exports = Installment;
