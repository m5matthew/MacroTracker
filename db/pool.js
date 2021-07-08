// Sets up a pool of database connections. Used by different routes
const pg = require("pg");
const config = require("./config.json");
module.exports = new pg.Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
});
pg.types.setTypeParser(1114, function (stringValue) {
  return stringValue; //1114 for time without timezone type
});
