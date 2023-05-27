require('dotenv').config();

module.exports = {
    SECRET: process.env.JWT_SECRET,
    DB: process.env.APP_DB,
    APP_PORT: process.env.APP_PORT,
    MONGODB: process.env.MONGODB_URI
};