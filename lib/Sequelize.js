const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelize;