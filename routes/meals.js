var express = require("express");
var pool = require("../db/pool.js");
var router = express.Router();

router.post("/add", function (req, res) {
  console.log("Adding meal", [
    req.body.name,
    req.body.protein,
    req.body.fat,
    req.body.carbs,
  ]);
  pool.query(
    `INSERT INTO meals (name, protein, fat, carbs) 
    VALUES ($1, $2, $3, $4)`,
    [req.body.name, req.body.protein, req.body.fat, req.body.carbs],
    (err, _) => {
      if (err) {
        // Need to check if error propogates to client with unique names
        next(err);
      }
      res.sendStatus(200);
    }
  );
});

router.get("/remove", function (req, res) {
  res.send("Removing meal", req.body.id);
  pool.query(`DELETE FROM meals WHERE id = $1`, [req.body.id], (err, _) => {
    if (err) {
      // Need to check if error propogates to client with unique names
      next(err);
    }
    res.sendStatus(200);
  });
});

router.get("/get", function (req, res) {
  console.log("Getting all meals");
  pool.query("SELECT * FROM meals", (err, query_result) => {
    if (err) {
      next(err);
    }
    console.log(query_result.rows);
    res.send(query_result.rows);
  });
});

module.exports = router;
