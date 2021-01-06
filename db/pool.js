// Sets up a pool of database connections. Used by different routes
const { Pool } = require("pg");
const config = require("./config.json");
module.exports = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
});
