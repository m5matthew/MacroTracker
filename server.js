const express = require("express");
const body_parser = require("body-parser");
const app = express();
const port = 3000;

// parse application/json
app.use(body_parser.json());

// Routes
const meals = require("./routes/meals");

app.get("/", (_req, res) => {
  res.sendFile("frontend/build/index.html", { root: __dirname });
});

app.use("/meals", meals);
// app.use("/entries", entries);

// Redirect webapp traffic to frontend build folder (for css, js, etc.)
app.use(express.static("frontend/build"));

app.listen(port, () => {
  console.log(`Macrotracker app listening at http://localhost:${port}`);
});
