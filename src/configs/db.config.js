const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const { NODE_ENV, DB_HOST_DEV, DB_NAME_DEV, DB_USER_DEV, DB_PASSWORD_DEV, DB_HOST_PRODUCTION, DB_NAME_PRODUCTION, DB_USER_PRODUCTION, DB_PASSWORD_PRODUCTION } = process.env;

let HOST, NAME, USER, PASS;

if (NODE_ENV === 'production') {
    HOST = DB_HOST_PRODUCTION;
    USER = DB_USER_PRODUCTION;
    PASS = DB_PASSWORD_PRODUCTION;
    NAME = DB_NAME_PRODUCTION;
} else {
    HOST = DB_HOST_DEV;
    USER = DB_USER_DEV;
    PASS = DB_PASSWORD_DEV;
    NAME = DB_NAME_DEV;
}

const connection = new Sequelize(NAME, USER, PASS, {
    host: HOST,
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
    }
});

try {
    connection.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error(error);
}

module.exports = connection;
