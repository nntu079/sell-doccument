const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/*
app.use(function (req, res, next) {
  var schema = req.headers["x-forwarded-proto"];

  if (schema === "https") {
    // Already https; don't do anything special.
    next();
  } else {
    // Redirect to https.
    res.redirect("https://" + req.headers.host + req.url);
  }
});
*/

const port = process.env.PORT || 5000;

const apiRoutes = require("./controllers/apis");
const pageRoutes = require("./controllers/pages");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/build")); //build reactjs

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/apis", apiRoutes);
app.use("/views", pageRoutes);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
