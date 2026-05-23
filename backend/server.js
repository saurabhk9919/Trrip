const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/authRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Orbitra Travel AI Backend Running");
});

// Health-check endpoint for deployments and load balancers
app.get("/health", (req, res) => {
  const state = mongoose.connection.readyState; // 0 disconnected,1 connected,2 connecting,3 disconnecting
  const dbStatus = state === 1 ? "connected" : state === 2 ? "connecting" : "disconnected";
  if (state === 1) {
    return res.status(200).json({ status: "ok", database: dbStatus });
  }
  return res.status(503).json({ status: "unavailable", database: dbStatus });
});

app.use("/api/auth", authRoutes);

app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();