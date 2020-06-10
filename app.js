const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://angelo-agenda-frontend.herokuapp.com/",
  })
);
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello world");
});
module.exports = app;
