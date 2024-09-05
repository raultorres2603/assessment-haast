var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/login", function (req, res, next) {
  const username = req.body.username;
  const pass = req.body.pass;
  console.log(username, pass);
});

module.exports = router;
