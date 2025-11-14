const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to communicate
app.use(express.json()); // Parse JSON body

// Track active version
let activeVersion = "Blue";
let previousVersion = "Blue"; // Track previous for rollback

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '🚀 Backend server is up and running!',
    version: activeVersion,
    timestamp: new Date().toISOString()
  });
});

// Health route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend is running!',
    version: activeVersion
  });
});

// Example API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Deploy (switch active version)
app.post('/api/deploy', (req, res) => {
  previousVersion = activeVersion;
  activeVersion = activeVersion === "Blue" ? "Green" : "Blue";
  res.json({
    version: activeVersion,
    message: `Deployment switched to ${activeVersion}!`
  });
});

// Rollback (restore previous version)
app.post('/api/rollback', (req, res) => {
  const temp = activeVersion;
  activeVersion = previousVersion;
  previousVersion = temp;
  res.json({
    version: activeVersion,
    message: `Rollback done. Active version is ${activeVersion}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
