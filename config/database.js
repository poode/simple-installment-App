const { Sequelize } = require('sequelize');
const config = require('./index');

const sequelize = new Sequelize({
    storage: config.storage,
    dialect: config.dialect,
    logging: config.logging || false,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
