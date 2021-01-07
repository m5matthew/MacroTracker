var express = require("express");
var pool = require("../db/pool.js");
var router = express.Router();

router.post("/add", async function (req, res, next) {
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
        next(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.delete("/remove", function (req, res, next) {
  res.send("Removing meal", req.body.id);
  pool.query(`DELETE FROM meals WHERE id = $1`, [req.body.id], (err, _) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get("/get", function (req, res, next) {
  console.log("Getting all meals");
  pool.query("SELECT * FROM meals", (err, query_result) => {
    if (err) {
      next(err);
    } else {
      console.log(query_result.rows);
      res.send(query_result.rows);
    }
  });
});

module.exports = router;
