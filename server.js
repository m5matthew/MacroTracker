const express = require("express");
const app = express();
const port = 3000;

// set up pool of database connections
const { Pool } = require("pg");
const config = require("./db/config.json");
const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
});

app.get("/", (req, res) => {
  res.send("Welcome to macro tracker");
});

app.post("/add_meal", (req, res) => {
  pool.query("SELECT * FROM meals", (err, res) => {
    console.log(err, res);
  }); //
  res.send("Success");
});

app.listen(port, () => {
  console.log(`Macrotracker app listening at http://localhost:${port}`);
});
