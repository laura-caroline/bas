require('dotenv').config()

module.exports = {
  username: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DB_DATABASE,
  host: process.env.HOST_DATABASE,
  dialect: process.env.DIALECT_DATABASE,
}
    