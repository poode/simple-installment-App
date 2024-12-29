const { Sequelize } = require('sequelize');
const config = require('./index');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const db = {};
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;
