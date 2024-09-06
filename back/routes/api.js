var express = require("express");
var router = express.Router();
var DB = require("../classes/DB");
var jose = require("jose");
var { signToken, verifyToken } = require("../functions/token");

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

router.get("/tasks", async function (req, res, next) {
  try {
    const tasks = await DB.getTasks(req.query.token);
    res.json({ tasks: tasks });
  } catch (error) {
    res.json({ error: error });
  }
});

router.post("/tasks", async function (req, res, next) {
  try {
    const task = req.body.task;
    const token = req.body.token;
    const result = await DB.addTask(token, task);
    res.json({ taskId: result });
  } catch (error) {
    res.json({ error: error });
  }
});

router.put("/tasks/:id", async function (req, res, next) {
  const idTask = req.params.id;
  const token = req.query.token;
  const state = req.query.state;

  try {
    const result = await DB.updateTask(token, idTask, state);
    res.json({ modifiedCount: result });
  } catch (error) {
    res.json({ error: error });
  }
});

router.delete("/tasks/:id", async function (req, res, next) {
  const idTask = req.params.id;
  const token = req.query.token;
  try {
    const result = await DB.deleteTask(token, idTask);
    res.json({ deleteCount: result });
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
