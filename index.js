const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // 👈 FIRST create app

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", taskRoutes);
app.use("/api/auth", authRoutes); // 👈 AFTER app is created

// mongo connection
mongoose
  .connect("mongodb://127.0.0.1:27017/trelloDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});