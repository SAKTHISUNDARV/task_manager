
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "sakthi@3003", 
  database: "task_manager"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User registered successfully" });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});
app.put("/update-task/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE tasks SET status = 'Completed' WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task status updated to Completed" });
  });
});

app.delete("/tasks/completed", (req, res) => {
  const sql = "DELETE FROM tasks WHERE status = 'completed'";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Completed tasks removed successfully" });
  });
});

app.post("/add-task", (req, res) => {
  const { title, description, status } = req.body;
  const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
  db.query(sql, [title, description, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task added successfully" });
  });
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});