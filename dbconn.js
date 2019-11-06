const { Pool } = require('pg');

const connectionString = 'postgressql://root:root@localhost:8001/capstonedb';

const pool = new Pool({
  connectionString,
});

module.exports = pool;
