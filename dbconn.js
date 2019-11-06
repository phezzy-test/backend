const { Pool } = require('pg');

const connectionString = `postgressql://${process.env.DB_USER}:${process.env.DB_USER_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
