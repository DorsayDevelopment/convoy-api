const pg = require('pg');

const config = {
  user: process.env.API_DB_USER || 'postgres', //env var: PGUSER
  database: process.env.API_DB_NAME || 'convoy', //env var: PGDATABASE
  password: process.env.API_DB_PASSWORD || 'postgres', //env var: PGPASSWORD
  host: process.env.API_DB_HOST || 'localhost', // Server hosting the postgres database
  port: process.env.API_DB_PORT || 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

exports.query = function (text, values, callback) {
  return pool.query(text, values, callback);
};

exports.connect = function (callback) {
  return pool.connect(callback);
};