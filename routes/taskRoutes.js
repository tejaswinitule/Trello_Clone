const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/add-task", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET ALL TASKS
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE STATUS
router.put("/update-status/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 🔥 DELETE TASK (IMPORTANT)
router.delete("/delete-task/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;