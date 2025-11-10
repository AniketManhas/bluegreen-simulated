const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "UP", version: "1.0.0" });
});

app.get("/api/data", (req, res) => {
  res.json([
    { id: 1, msg: "Blue/Green CI/CD working fine" },
    { id: 2, msg: "Zero Downtime Simulation" }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
