const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to communicate
app.use(express.json()); // Parse JSON body

// Test route (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Example API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
let activeVersion = "Blue"; // Track active version

// Deploy (switch active version)
app.post('/api/deploy', (req, res) => {
  activeVersion = activeVersion === "Blue" ? "Green" : "Blue";
  res.json({
    version: activeVersion,
    message: `Deployment switched to ${activeVersion}!`
  });
});

// Rollback (switch back)
app.post('/api/rollback', (req, res) => {
  activeVersion = activeVersion === "Blue" ? "Green" : "Blue";
  res.json({
    version: activeVersion,
    message: `Rollback done. Active version is ${activeVersion}`
  });
});

// Update health route to include version
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend is running!',
    version: activeVersion
  });
});
