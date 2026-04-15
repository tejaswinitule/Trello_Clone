const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: "TODO",
  },
});

module.exports = mongoose.model("Task", taskSchema);