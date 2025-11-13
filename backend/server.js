const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow frontend to access backend
app.use(cors());
app.use(express.json());

// ✅ Serve a simple HTML page for browser
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Backend Home</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f0f0f0; }
          h1 { color: #4CAF50; }
          p { font-size: 18px; }
          .box { background: white; padding: 30px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Backend Server ✅</h1>
          <p>Visit <a href="/api/health">/api/health</a> to check API response</p>
        </div>
      </body>
    </html>
  `);
});

// ✅ Test route (API check)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend Connected ✅" });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
