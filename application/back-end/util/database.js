const {Pool} = require('pg');

const config = require('../config/config.json');

const pool = new Pool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.port
})

module.exports = pool;