const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ⭐⭐ CHANGE MADE HERE ⭐⭐
// Default route (beautiful JSON response)
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Backend server is up and running smoothly!",
    version: "1.0.0",
    
    timestamp: new Date().toISOString()
  });
});
// ⭐⭐ CHANGE ENDS HERE ⭐⭐

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Backend Home Route Loaded Successfully!",
    note: "This is the root of your backend",
    timestamp: new Date().toISOString()
  });
});
