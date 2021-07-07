var express = require("express");
var pool = require("../db/pool.js");
var router = express.Router();

router.post("/add", async function (req, res, next) {
  console.log("Adding entry", [
    req.body.date,
    req.body.meal_id,
    req.body.quantity,
  ]);
  pool.query(
    `INSERT INTO entries (date, meal_id, quantity) 
    VALUES (to_timestamp($1), $2, $3)`,
    [req.body.date, req.body.meal_id, req.body.quantity],
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
  // TODO: Need to figure out what happens with duplicate entries
  //       Can possible do a subquery.
  res.send("Removing entry", req.body.id);
  //   pool.query(
  //     `DELETE FROM entries WHERE date = $1 AND meal_id = $2`,
  //     [req.body.date, req.body.meal_id],
  //     (err, _) => {
  //       if (err) {
  //         next(err);
  //       } else {
  //         res.sendStatus(200);
  //       }
  //     }
  //   );
});

router.get("/get", function (req, res, next) {
  console.log("Getting all entries");
  pool.query("SELECT * FROM entries", (err, query_result) => {
    if (err) {
      next(err);
    } else {
      console.log(query_result.rows);
      res.send(query_result.rows);
    }
  });
});

// req.body.timestamp should be in seconds since epoch
router.get("/get_by_date", function (req, res, next) {
  console.log("Getting all entries on this date", req.query.timestamp);

  pool.query(
    `SELECT * 
    FROM entries 
    NATURAL JOIN meals
    WHERE entries.date::date = to_timestamp($1)::date`,
    [req.query.timestamp],
    (err, query_result) => {
      if (err) {
        next(err);
      } else {
        console.log(query_result.rows);
        res.send(query_result.rows);
      }
    }
  );
});

module.exports = router;
