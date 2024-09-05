var express = require("express");
var router = express.Router();
var DB = require("../classes/DB");
var jose = require("jose");
var { signToken } = require("../functions/token");

/* GET home page. */
router.post("/login", async function (req, res, next) {
  const username = req.body.username;
  const pass = req.body.pass;
  try {
    const user = await DB.logIn(username, pass);
    const token = await signToken(user._id);
    res.json({ token: token });
  } catch (error) {
    res.json({ error: "No user" });
  }
});

router.post("/register", async function (req, res, next) {
  const username = req.body.username;
  const pass = req.body.pass;
  try {
    const user = await DB.register(username, pass);
    const token = await signToken(user.insertedId);
    res.json({ token: token });
  } catch (error) {
    res.json({ error: error });
  }
});

router.use((req, res, next) => {
  if (req.baseUrl.indexOf("/api/tasks") !== -1) {
    if (!req.query.token) {
      res.json({ error: "No token" });
    } else {
      next();
    }
  }
});

module.exports = router;
