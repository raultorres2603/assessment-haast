var express = require("express");
var router = express.Router();
var DB = require("../classes/DB");
var jose = require("jose");

/* GET home page. */
router.post("/login", async function (req, res, next) {
  const username = req.body.username;
  const pass = req.body.pass;
  try {
    const user = await DB.logIn(username, pass);
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.SK);
    const token = await new jose.SignJWT({ user: user._id })
      .setProtectedHeader({
        alg,
      })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
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
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.SK);
    const token = await new jose.SignJWT({ user: user.insertedId })
      .setProtectedHeader({
        alg,
      })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
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
